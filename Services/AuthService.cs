using Data.CustomDataAttributes.InjectionAttributes;
using Data.DTOs.User;
using Data.Entities;
using Data.Repositories;
using System.Security.Cryptography;

namespace Services
{
    [ScopedAttribute]
    public class AuthService
    {
        #region Properties

        private readonly AuthRepository _authRepository;

        #endregion Properties

        #region Constructors

        public AuthService(AuthRepository authRepository)
        {
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

        public async Task<bool> CheckIfUserExists(string email)
        {
            var userExists = await _authRepository.CheckIfUserExists(email);

            return userExists;
        }

        public async Task<bool> AddUserAsync(NewUserDTO userDTO)
        {
            try
            {
                var salt = CreateSalt(8);
                var hashedPassword = CreateHash(userDTO.Password, salt);

                User newUser = new User()
                {
                    Email = userDTO.Email,
                    Password = hashedPassword,
                    Salt = salt
                };

                await _authRepository.AddAndSaveChangesAsync(newUser);
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