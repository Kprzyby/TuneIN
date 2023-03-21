using Azure;
using Azure.Communication;
using Azure.Communication.Chat;
using Azure.Communication.Identity;
using Azure.Core;
using Data.CustomDataAttributes.InjectionAttributes;
using Data.DTOs.Chat;
using Data.Entities;
using Data.Repositories;
using Microsoft.Extensions.Configuration;
using System.Text.Json;

namespace Services
{
    [ScopedAttribute]
    public class ChatService : BaseService
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

        private ChatClient GetChatClient(AccessToken token)
        {
            Uri endpoint = new Uri(_configuration.GetConnectionString("ChatEndpoint"));
            CommunicationTokenCredential communicationTokenCredential = new CommunicationTokenCredential(token.Token);
            ChatClient chatClient = new ChatClient(endpoint, communicationTokenCredential);

            return chatClient;
        }

        public async Task<string> GenerateChatAccessTokenAsync(string email)
        {
            try
            {
                User user = await _authRepository.GetUserByEmailAsync(email);

                string connectionString = _configuration.GetConnectionString("AzureChatConnection");
                var client = new CommunicationIdentityClient(connectionString);

                var chatIdentity = new CommunicationUserIdentifier(user.ChatIdentityId);
                TimeSpan tokenExpiresIn = TimeSpan.FromHours(2);
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
                TimeSpan tokenExpiresIn = TimeSpan.FromHours(2);

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
                ChatClient chatClient = GetChatClient(token);

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

        public async Task<string> SendMessageAsync(string chatId, string message, int userId, AccessToken token)
        {
            try
            {
                User user = await _authRepository.GetByIdAsync(userId);

                ChatClient client = GetChatClient(token);
                ChatThreadClient chatThreadClient = client.GetChatThreadClient(chatId);

                SendChatMessageOptions sendChatMessageOptions = new SendChatMessageOptions()
                {
                    Content = message,
                    MessageType = ChatMessageType.Text,
                    SenderDisplayName = user.UserName
                };

                SendChatMessageResult sendChatMessageResult = await chatThreadClient.SendMessageAsync(sendChatMessageOptions);

                string messageId = sendChatMessageResult.Id;

                return messageId;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<GetChatDTO> GetChatAsync(string chatId, int pageSize, int userId, AccessToken token)
        {
            try
            {
                User user = await _authRepository.GetByIdAsync(userId);

                ChatClient client = GetChatClient(token);
                ChatThreadClient chatThreadClient = client.GetChatThreadClient(chatId);

                ChatThreadProperties chatThread = chatThreadClient.GetProperties();

                AsyncPageable<ChatMessage> chatMessages = chatThreadClient.GetMessagesAsync();

                List<Page<ChatMessage>> messagesPages = await chatMessages.AsPages(null, pageSize).ToListAsync();
                Page<ChatMessage> messagesPage = messagesPages[0];

                List<ChatMessageDTO> messages = new List<ChatMessageDTO>();

                foreach (ChatMessage message in messagesPage.Values)
                {
                    ChatMessageDTO messageDTO;
                    if (message.Type == ChatMessageType.Text)
                    {
                        messageDTO = new ChatMessageDTO()
                        {
                            Id = message.Id,
                            Message = message.Content.Message,
                            SenderId = message.Sender.RawId,
                            SenderName = message.SenderDisplayName,
                            UserIsSender = message.Sender.RawId == user.ChatIdentityId ? true : false
                        };
                    }
                    else
                    {
                        messageDTO = new ChatMessageDTO()
                        {
                            Id = message.Id,
                            Message = message.Type.ToString(),
                            SenderId = Guid.NewGuid().ToString(),
                            SenderName = "System",
                            UserIsSender = false
                        };
                    }

                    messages.Add(messageDTO);
                }

                AsyncPageable<ChatParticipant> participants = chatThreadClient.GetParticipantsAsync();
                List<ChatParticipant> chatParticipants = await participants.ToListAsync();

                GetChatDTO result = new GetChatDTO()
                {
                    Id = chatThread.Id,
                    Topic = chatThread.Topic,
                    Participants = chatParticipants,
                    Messages = messages,
                    ContinuationToken = messagesPage.ContinuationToken
                };

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<GetChatsDTO> GetChatListAsync(int pageSize, int messagePageSize, int userId, string continuationToken, AccessToken accessToken)
        {
            try
            {
                ChatClient client = GetChatClient(accessToken);

                AsyncPageable<ChatThreadItem> chats = client.GetChatThreadsAsync();

                List<Page<ChatThreadItem>> chatsPages = await chats.AsPages(continuationToken, pageSize).ToListAsync();
                Page<ChatThreadItem> chatPage = chatsPages[0];

                List<GetChatDTO> chatDTOs = new List<GetChatDTO>();

                foreach (ChatThreadItem chat in chatPage.Values)
                {
                    GetChatDTO chatDTO = await GetChatAsync(chat.Id, messagePageSize, userId, accessToken);

                    chatDTOs.Add(chatDTO);
                }

                GetChatsDTO result = new GetChatsDTO()
                {
                    Chats = chatDTOs,
                    ContinuationToken = chatPage.ContinuationToken
                };

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<GetMessagesDTO> GetChatMessagesAsync(string chatId, int userId, int pageSize, string continuationToken, AccessToken accessToken)
        {
            try
            {
                User user = await _authRepository.GetByIdAsync(userId);

                ChatClient client = GetChatClient(accessToken);
                ChatThreadClient chatThreadClient = client.GetChatThreadClient(chatId);

                AsyncPageable<ChatMessage> chatMessages = chatThreadClient.GetMessagesAsync();

                List<Page<ChatMessage>> messagesPages = await chatMessages.AsPages(continuationToken, pageSize).ToListAsync();
                Page<ChatMessage> messagesPage = messagesPages[0];

                List<ChatMessageDTO> messages = new List<ChatMessageDTO>();

                foreach (ChatMessage message in messagesPage.Values)
                {
                    ChatMessageDTO messageDTO;
                    if (message.Type == ChatMessageType.Text)
                    {
                        messageDTO = new ChatMessageDTO()
                        {
                            Id = message.Id,
                            Message = message.Content.Message,
                            SenderId = message.Sender.RawId,
                            SenderName = message.SenderDisplayName,
                            UserIsSender = message.Sender.RawId == user.ChatIdentityId ? true : false
                        };
                    }
                    else
                    {
                        messageDTO = new ChatMessageDTO()
                        {
                            Id = message.Id,
                            Message = message.Type.ToString(),
                            SenderId = Guid.NewGuid().ToString(),
                            SenderName = "System",
                            UserIsSender = false
                        };
                    }

                    messages.Add(messageDTO);
                }

                GetMessagesDTO result = new GetMessagesDTO()
                {
                    Messages = messages,
                    ContinuationToken = messagesPage.ContinuationToken
                };

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        #endregion Methods
    }
}