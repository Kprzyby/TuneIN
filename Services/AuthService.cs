using Azure.Communication.Email;
using Azure.Communication.Email.Models;
using Azure.Communication.Identity;
using Common.Enums;
using Data.CustomDataAttributes.InjectionAttributes;
using Data.DTOs.Response;
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
    public class AuthService : BaseService
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

        public async Task<ServiceResponseDTO> AddUserAsync(NewUserDTO userDTO)
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
                return CreateFailureResponse(500, "Internal server error while adding the user");
            }

            return CreateSuccessResponse(201, "User added successfully");
        }

        public async Task<ServiceResponseDTO> ConfirmAccountAsync(string email, Guid confirmationGUID)
        {
            try
            {
                User user = await _authRepository.GetUserByEmailAsync(email);

                if (user == default)
                {
                    return CreateFailureResponse(404, "User with such an email was not found");
                }

                if (user.ConfirmationGUID != confirmationGUID)
                {
                    return CreateFailureResponse(403, "This action was not reached by the link that was provided in the confirmation email");
                }

                user.UserRole = UserRole.REGULAR_USER.ToString();

                await _authRepository.UpdateAndSaveChangesAsync(user);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while confirming the user's account");
            }

            return CreateSuccessResponse(200, "Account confirmed successfully");
        }

        public async Task<ServiceResponseDTO> SendPasswordRecoveryEmailAsync(string email, string URL, Guid passwordRecoveryGUID)
        {
            try
            {
                User user = await _authRepository.GetUserByEmailAsync(email);

                if (user == default)
                {
                    return CreateFailureResponse(404, "User with such an email was not found");
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
                return CreateFailureResponse(500, "Error while sending password recovery email");
            }

            return CreateSuccessResponse(200, "Password recovery email successfully sent");
        }

        public async Task<ServiceResponseDTO> ChangePasswordAsync(string email, string password, Guid passwordRecoveryGUID)
        {
            try
            {
                User user = await _authRepository.GetUserByEmailAsync(email);

                if (user == default)
                {
                    return CreateFailureResponse(404, "User with such an email was not found");
                }

                if (user.PasswordRecoveryGUID != passwordRecoveryGUID)
                {
                    return CreateFailureResponse(403, "This action was not reached by the link that was provided in the password recovery email");
                }

                byte[] salt = CreateSalt(8);
                string newPassword = CreateHash(password, salt);

                user.Salt = salt;
                user.Password = newPassword;

                await _authRepository.UpdateAndSaveChangesAsync(user);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while changing the user's password");
            }

            return CreateSuccessResponse(200, "Password successfully changed");
        }

        public async Task<ServiceResponseDTO> ValidateUserAndCreateClaimsAsync(string email, string password)
        {
            try
            {
                User user = await _authRepository.GetUserByEmailAsync(email);

                if (user == default)
                {
                    return CreateFailureResponse(404, "User with such an email was not found");
                }

                var hashedPassword = CreateHash(password, user.Salt);

                if (hashedPassword != user.Password)
                {
                    return CreateFailureResponse(401, "Wrong password or email");
                }

                List<Claim> claims = new List<Claim>()
                {
                    new Claim("Id", user.Id.ToString()),
                    new Claim("UserRole", user.UserRole)
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                return CreateSuccessResponse(200, "Authorization credentials validated", claimsIdentity);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while validating the authorization credentials");
            }
        }

        public async Task<ServiceResponseDTO> SendConfirmationEmailAsync(string email, string userName, string confirmationURL)
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
                return CreateFailureResponse(502, "External server error while sending the confirmation email");
            }

            return CreateSuccessResponse(200, "Confirmation email successfully sent");
        }

        public async Task<ServiceResponseDTO> GetUserAsync(string email, int? id)
        {
            try
            {
                User user;

                if (id != null)
                {
                    user = await _authRepository.GetByIdAsync((int)id);
                }
                else
                {
                    user = await _authRepository.GetUserByEmailAsync(email);
                }

                if (user == null)
                {
                    return CreateFailureResponse(404, "User was not found");
                }

                ReadUserDTO result = new ReadUserDTO()
                {
                    Id = user.Id,
                    UserRole = user.UserRole,
                    UserName = user.UserName,
                    Email = user.Email
                };

                return CreateSuccessResponse(200, "User found", result);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while loading the user");
            }
        }

        #endregion Methods
    }
}