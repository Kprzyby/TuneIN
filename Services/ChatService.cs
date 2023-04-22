﻿using Azure;
using Azure.Communication;
using Azure.Communication.Chat;
using Azure.Communication.Identity;
using Azure.Core;
using Data.CustomDataAttributes.InjectionAttributes;
using Data.DTOs.Chat;
using Data.DTOs.Response;
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

        private readonly UserRepository _userRepository;
        private readonly IConfiguration _configuration;

        #endregion Properties

        #region Constructors

        public ChatService(IConfiguration configuration, UserRepository userRepository)
        {
            _configuration = configuration;
            _userRepository = userRepository;
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

        public async Task<ServiceResponseDTO> GenerateChatAccessTokenAsync(string email)
        {
            try
            {
                User user = await _userRepository.GetUserByEmailAsync(email);

                if (user == null)
                {
                    return CreateFailureResponse(404, "User with such an email was not found");
                }

                string connectionString = _configuration.GetConnectionString("AzureChatConnection");
                var client = new CommunicationIdentityClient(connectionString);

                var chatIdentity = new CommunicationUserIdentifier(user.ChatIdentityId);
                TimeSpan tokenExpiresIn = TimeSpan.FromHours(2);
                var tokenResponse = await client.GetTokenAsync(chatIdentity, scopes: new[] { CommunicationTokenScope.Chat }, tokenExpiresIn);

                var token = JsonSerializer.Serialize(tokenResponse.Value);

                return CreateSuccessResponse(200, "Chat token generated successfully", token);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(502, "External server error while generating chat token");
            }
        }

        public async Task<ServiceResponseDTO> RemoveAllTokensAsync(int id)
        {
            try
            {
                User? user = await _userRepository.GetByIdAsync(id);

                if (user == null)
                {
                    return CreateFailureResponse(404, "User with such an id was not found");
                }

                string connectionString = _configuration.GetConnectionString("AzureChatConnection");
                var client = new CommunicationIdentityClient(connectionString);

                var chatIdentity = new CommunicationUserIdentifier(user.ChatIdentityId);
                await client.RevokeTokensAsync(chatIdentity);

                return CreateSuccessResponse(200, "All user's chat token were successfully removed");
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(502, "External server error while removing the user's chat tokens");
            }
        }

        public async Task<AccessToken> RefreshTokensAsync(int id)
        {
            try
            {
                User? user = await _userRepository.GetByIdAsync(id);

                if (user == null)
                {
                    CreateFailureResponse(500, "Error while loading the current user");
                }

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

        public async Task<ServiceResponseDTO> CreateChatAsync(string? topic, List<int> participantsIds, AccessToken token)
        {
            try
            {
                ChatClient chatClient = GetChatClient(token);

                List<ChatParticipant> chatParticipants = new List<ChatParticipant>();

                foreach (int participantId in participantsIds)
                {
                    User user = await _userRepository.GetByIdAsync(participantId);
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

                return CreateSuccessResponse(201, "Chat created successfully", createChatThreadResult.ChatThread.Id);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "External server error while creating the chat");
            }
        }

        public async Task<ServiceResponseDTO> SendMessageAsync(string chatId, string message, int userId, AccessToken token)
        {
            try
            {
                User user = await _userRepository.GetByIdAsync(userId);

                if (user == null)
                {
                    CreateFailureResponse(500, "Error while loading the current user");
                }

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

                return CreateSuccessResponse(201, "Message successfully sent", messageId);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while sending the message to the chat");
            }
        }

        public async Task<ServiceResponseDTO> GetChatAsync(string chatId, int pageSize, int userId, AccessToken token)
        {
            try
            {
                User user = await _userRepository.GetByIdAsync(userId);

                if (user == null)
                {
                    CreateFailureResponse(500, "Error while loading the current user");
                }

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

                return CreateSuccessResponse(200, "Chat successfully retrieved", result);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while retrieving the chat");
            }
        }

        public async Task<ServiceResponseDTO> GetChatListAsync(int pageSize, int messagePageSize, int userId, string continuationToken, AccessToken accessToken)
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
                    var getResponse = await GetChatAsync(chat.Id, messagePageSize, userId, accessToken);

                    if (getResponse.IsSuccess == false)
                    {
                        return CreateFailureResponse(500, "Error while retrieving one of the chats");
                    }

                    GetChatDTO chatDTO = (GetChatDTO)getResponse.Result;

                    chatDTOs.Add(chatDTO);
                }

                GetChatsDTO result = new GetChatsDTO()
                {
                    Chats = chatDTOs,
                    ContinuationToken = chatPage.ContinuationToken
                };

                return CreateSuccessResponse(200, "Chats successfully loaded", result);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while loading chats");
            }
        }

        public async Task<ServiceResponseDTO> GetChatMessagesAsync(string chatId, int userId, int pageSize, string continuationToken, AccessToken accessToken)
        {
            try
            {
                User user = await _userRepository.GetByIdAsync(userId);

                if (user == null)
                {
                    CreateFailureResponse(500, "Error while loading the current user");
                }

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

                return CreateSuccessResponse(200, "Messages successfully retrieved", result);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while loading the messages");
            }
        }

        #endregion Methods
    }
}