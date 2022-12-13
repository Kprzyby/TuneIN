using Azure.Communication;
using Azure.Communication.Identity;
using Data.CustomDataAttributes.InjectionAttributes;
using Data.Entities;
using Data.Repositories;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Services
{
    [ScopedAttribute]
    public class ChatService
    {
        #region Properties

        private readonly AuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        #endregion Properties

        #region Constructors

        public ChatService(IConfiguration configuration, AuthRepository authRepository)
        {
            _configuration = configuration;
            _authRepository = authRepository;
        }

        #endregion Constructors

        #region Methods

        public async Task<string> GenerateChatAccessTokenAsync(string email)
        {
            try
            {
                User user = await _authRepository.GetUserByEmailAsync(email);

                string connectionString = _configuration.GetConnectionString("AzureChatConnection");
                var client = new CommunicationIdentityClient(connectionString);

                var chatIdentity = new CommunicationUserIdentifier(user.ChatIdentityId);
                TimeSpan tokenExpiresIn = TimeSpan.FromMinutes(5);
                var tokenResponse = await client.GetTokenAsync(chatIdentity, scopes: new[] { CommunicationTokenScope.Chat }, tokenExpiresIn);

                var token = JsonSerializer.Serialize(tokenResponse.Value);

                return token;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<bool> RemoveAllTokensAsync(int id)
        {
            try
            {
                User? user = await _authRepository.GetByIdAsync(id);

                string connectionString = _configuration.GetConnectionString("AzureChatConnection");
                var client = new CommunicationIdentityClient(connectionString);

                var chatIdentity = new CommunicationUserIdentifier(user.ChatIdentityId);
                await client.RevokeTokensAsync(chatIdentity);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<string> RefreshTokensAsync(int id)
        {
            try
            {
                User? user = await _authRepository.GetByIdAsync(id);

                string connectionString = _configuration.GetConnectionString("AzureChatConnection");
                var client = new CommunicationIdentityClient(connectionString);

                var chatIdentity = new CommunicationUserIdentifier(user.ChatIdentityId);
                TimeSpan tokenExpiresIn = TimeSpan.FromMinutes(5);

                var tokenResponse = await client.GetTokenAsync(chatIdentity, scopes: new[] { CommunicationTokenScope.Chat }, tokenExpiresIn);

                var token = JsonSerializer.Serialize(tokenResponse.Value);

                return token;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        #endregion Methods
    }
}