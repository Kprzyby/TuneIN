using Azure.Communication.Email;
using Azure.Communication.Email.Models;
using Azure.Communication.Identity;
using Common.Enums;
using Data.CustomDataAttributes.InjectionAttributes;
using Data.DTOs.User;
using Data.Entities;
using Data.Repositories;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Services
{
    [ScopedAttribute]
    public class AuthService
    {
        #region Properties

        private readonly AuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        #endregion Properties

        #region Constructors

        public AuthService(IConfiguration configuration, AuthRepository authRepository)
        {
            _configuration = configuration;
            _authRepository = authRepository;
        }

        #endregion Constructors

        #region Methods

        private byte[] CreateSalt(int saltLength)
        {
            RNGCryptoServiceProvider rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            byte[] salt = new byte[saltLength];

            rngCryptoServiceProvider.GetBytes(salt);

            return salt;
        }

        private string CreateHash(string password, byte[] salt)
        {
            Rfc2898DeriveBytes rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, salt, 10000);

            byte[] hash = rfc2898DeriveBytes.GetBytes(24);
            string hashedPassword = Convert.ToBase64String(hash);

            return hashedPassword;
        }

        private string CreateConfirmationMessage(string userName, string confirmationURL)
        {
            string result = $"<p>Hi, {userName}! Glad to have you on board. Your account " +
                    $"is almost ready to go. To finish creating your account click the link below:</p>" +
                    $"<a href='{confirmationURL}'>Click here to confirm your account</a><br><br><br><br>" +
                    $"<p>This email was generated automatically. Please do not respond.</p>";

            return result;
        }

        private string CreatePasswordRecoveryMessage(string passwordRecoveryURL)
        {
            string result = $"<p>We've received a request to recover the password to your" +
                $" account. To recover your password click on the link below:</p>" +
                $"<a href='{passwordRecoveryURL}'>Click here to recover your password</a><br><br><br><br>" +
                $"<p>If you didn't request the password recovery please ignore " +
                $"this message.</p>";

            return result;
        }

        public async Task<bool> CheckIfUserExistsAsync(string email)
        {
            var userExists = await _authRepository.CheckIfUserExistsAsync(email);

            return userExists;
        }

        public async Task<bool> AddUserAsync(NewUserDTO userDTO)
        {
            try
            {
                var salt = CreateSalt(8);
                var hashedPassword = CreateHash(userDTO.Password, salt);

                string connectionString = _configuration.GetConnectionString("AzureChatConnection");
                var client = new CommunicationIdentityClient(connectionString);

                var identityResponse = await client.CreateUserAsync();
                var identity = identityResponse.Value;

                User newUser = new User()
                {
                    UserName = userDTO.UserName,
                    Email = userDTO.Email,
                    Password = hashedPassword,
                    Salt = salt,
                    UserRole = userDTO.UserRole,
                    ConfirmationGUID = userDTO.ConfirmationGUID,
                    ChatIdentityId = identity.Id
                };

                await _authRepository.AddAndSaveChangesAsync(newUser);
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public async Task<bool> ConfirmAccountAsync(string email, Guid confirmationGUID)
        {
            try
            {
                User user = await _authRepository.GetUserByEmailAsync(email);

                if (user == default)
                {
                    return false;
                }

                if (user.ConfirmationGUID != confirmationGUID)
                {
                    return false;
                }

                user.UserRole = UserRole.REGULAR_USER.ToString();

                await _authRepository.UpdateAndSaveChangesAsync(user);
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public async Task<bool> SendPasswordRecoveryEmailAsync(string email, string URL, Guid passwordRecoveryGUID)
        {
            try
            {
                User user = await _authRepository.GetUserByEmailAsync(email);

                if (user == default)
                {
                    return false;
                }

                user.PasswordRecoveryGUID = passwordRecoveryGUID;

                Task updateUser = _authRepository.UpdateAndSaveChangesAsync(user);

                string connectionString = _configuration.GetConnectionString("AzureEmailConnection");
                EmailClient emailClient = new EmailClient(connectionString);

                EmailContent content = new EmailContent("Password recovery");

                string messageBody = CreatePasswordRecoveryMessage(URL);
                content.Html = messageBody;

                List<EmailAddress> emailAddresses = new List<EmailAddress>()
                {
                    new EmailAddress(email)
                };
                EmailRecipients recipients = new EmailRecipients(emailAddresses);

                EmailMessage message = new EmailMessage("DoNotReply@ea98e812-1b13-4e43-b67c-11525e9a8145.azurecomm.net", content, recipients);

                await emailClient.SendAsync(message);
                await updateUser;
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public async Task<bool> ChangePasswordAsync(string email, string password, Guid passwordRecoveryGUID)
        {
            try
            {
                User user = await _authRepository.GetUserByEmailAsync(email);

                if (user == default)
                {
                    return false;
                }

                if (user.PasswordRecoveryGUID != passwordRecoveryGUID)
                {
                    return false;
                }

                byte[] salt = CreateSalt(8);
                string newPassword = CreateHash(password, salt);

                user.Salt = salt;
                user.Password = newPassword;

                await _authRepository.UpdateAndSaveChangesAsync(user);
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public async Task<ClaimsIdentity?> ValidateUserAndCreateClaimsAsync(string email, string password)
        {
            try
            {
                User user = await _authRepository.GetUserByEmailAsync(email);

                if (user == default)
                {
                    return null;
                }

                var hashedPassword = CreateHash(password, user.Salt);

                if (hashedPassword != user.Password)
                {
                    return null;
                }

                List<Claim> claims = new List<Claim>()
                {
                    new Claim("Id", user.Id.ToString()),
                    new Claim("UserRole", user.UserRole)
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                return claimsIdentity;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<bool> SendConfirmationEmailAsync(string email, string userName, string confirmationURL)
        {
            string connectionString = _configuration.GetConnectionString("AzureEmailConnection");

            try
            {
                EmailClient emailClient = new EmailClient(connectionString);

                EmailContent content = new EmailContent("Confirm your account");

                string messageBody = CreateConfirmationMessage(userName, confirmationURL);
                content.Html = messageBody;

                List<EmailAddress> emailAddresses = new List<EmailAddress>()
                {
                    new EmailAddress(email)
                };
                EmailRecipients recipients = new EmailRecipients(emailAddresses);

                EmailMessage message = new EmailMessage("DoNotReply@ea98e812-1b13-4e43-b67c-11525e9a8145.azurecomm.net", content, recipients);

                await emailClient.SendAsync(message);
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        #endregion Methods
    }
}