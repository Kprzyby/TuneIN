using Azure.Communication;
using Azure.Communication.Chat;
using Azure.Communication.Identity;
using Azure.Core;
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

        public async Task<AccessToken> RefreshTokensAsync(int id)
        {
            try
            {
                User? user = await _authRepository.GetByIdAsync(id);

                string connectionString = _configuration.GetConnectionString("AzureChatConnection");
                var client = new CommunicationIdentityClient(connectionString);

                var chatIdentity = new CommunicationUserIdentifier(user.ChatIdentityId);
                TimeSpan tokenExpiresIn = TimeSpan.FromMinutes(5);

                var tokenResponse = await client.GetTokenAsync(chatIdentity, scopes: new[] { CommunicationTokenScope.Chat }, tokenExpiresIn);

                return tokenResponse.Value;
            }
            catch (Exception ex)
            {
                return new AccessToken("", new DateTimeOffset());
            }
        }

        public async Task<string> CreateChatAsync(string? topic, List<int> participantsIds, AccessToken token)
        {
            try
            {
                Uri endpoint = new Uri(_configuration.GetConnectionString("ChatEndpoint"));
                CommunicationTokenCredential communicationTokenCredential = new CommunicationTokenCredential(token.Token);
                ChatClient chatClient = new ChatClient(endpoint, communicationTokenCredential);

                List<ChatParticipant> chatParticipants = new List<ChatParticipant>();

                foreach (int participantId in participantsIds)
                {
                    User user = await _authRepository.GetByIdAsync(participantId);
                    ChatParticipant chatParticipant = new ChatParticipant(new CommunicationUserIdentifier(user.ChatIdentityId));
                    chatParticipant.DisplayName = user.UserName;

                    chatParticipants.Add(chatParticipant);
                }

                string chatTopic = "New chat";

                if (topic != null)
                {
                    chatTopic = topic;
                }

                CreateChatThreadResult createChatThreadResult = await chatClient.CreateChatThreadAsync(chatTopic, chatParticipants);

                return createChatThreadResult.ChatThread.Id;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        #endregion Methods
    }
}