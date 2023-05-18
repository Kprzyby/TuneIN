using Azure.Core;
using Backend.ViewModels.Chat;
using Common.CustomDataAttributes;
using Data.DTOs.Chat;
using Microsoft.AspNetCore.Mvc;
using Nancy.Json;
using Services;

namespace Backend.Controllers
{
    [ApiController]
    public class ChatController : BaseController
    {
        #region Properties

        private readonly ChatService _chatService;

        #endregion Properties

        #region Constructors

        public ChatController(ChatService chatService)
        {
            _chatService = chatService;
        }

        #endregion Constructors

        #region Methods

        private async Task<AccessToken> GetTokenAsync()
        {
            var tokenObject = new JavaScriptSerializer().Deserialize<object>(Request.Cookies["ChatToken"]);
            Dictionary<string, object>.ValueCollection tokenValues =
                (Dictionary<string, object>.ValueCollection)tokenObject
                .GetType()
                .GetProperty("Values")
                .GetValue(tokenObject);
            List<object> tokenValuesList = new List<object>(tokenValues);
            string tokenValue = tokenValuesList[0].ToString();
            string expireString = tokenValuesList[1].ToString();
            DateTimeOffset expiresOn = DateTimeOffset.Parse(expireString);

            AccessToken token = new AccessToken(tokenValue, expiresOn);

            if (token.ExpiresOn.DateTime < DateTime.Now.AddMinutes(1))
            {
                token = await _chatService.RefreshTokensAsync(GetUserId());

                Response.Cookies.Append("ChatToken", System.Text.Json.JsonSerializer.Serialize(token));
            }

            return token;
        }

        /// <summary>
        /// Asynchronous method for creating a chat between users
        /// </summary>
        /// <param name="newChat">Object containing information necessary to create a chat</param>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// There is no need to add the currently logged in user's id. It will be added automatically
        /// </remarks>
        /// <returns>Created chat's id</returns>
        /// <response code="201">Created chat's id</response>
        /// <response code="404">Error message</response>
        /// <response code="409">Error message</response>
        /// <response code="500">Error message</response>
        /// <response code="502">Error message</response>
        [HttpPost]
        [Route("Chat/CreateChatAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(string), 201)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 409)]
        [ProducesResponseType(typeof(string), 500)]
        [ProducesResponseType(typeof(string), 502)]
        public async Task<IActionResult> CreateChatAsync(CreateChatViewModel newChat)
        {
            var token = await GetTokenAsync();

            if (token.Token == "")
            {
                return StatusCode(502, "Error while creating an access token!");
            }

            var result = await _chatService.CreateChatAsync(GetUserId(), newChat.Topic, newChat.ParticipantsIds, token);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            string newChatId = (string)result.Result;

            return StatusCode(result.StatusCode, newChatId);
        }

        /// <summary>
        /// Asynchronous method for loading information about the chat specified by an id for the user that is currently logged in
        /// </summary>
        /// <param name="chatId"></param>
        /// <param name="pageSize"></param>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <returns>Object containing information about the chat</returns>
        /// <response code="200">Object containing information about the chat</response>
        /// <response code="500">Error message</response>
        /// <response code="502">Error message</response>
        [HttpGet]
        [Route("Chat/GetChatAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(GetChatDTO), 200)]
        [ProducesResponseType(typeof(string), 500)]
        [ProducesResponseType(typeof(string), 502)]
        public async Task<IActionResult> GetChatAsync(string chatId, int pageSize)
        {
            var token = await GetTokenAsync();

            if (token.Token == "")
            {
                return StatusCode(502, "Error while creating an access token!");
            }

            var result = await _chatService.GetChatAsync(chatId, pageSize, GetUserId(), token);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            GetChatDTO chatDTO = (GetChatDTO)result.Result;

            return Ok(chatDTO);
        }

        /// <summary>
        /// Asynchronous method for loading all chats that the user that is currently logged in is part of
        /// </summary>
        /// <param name="pageSize">Number specifying the number of chats to be loaded</param>
        /// <param name="messagePageSize">Number specifying the number of messages to be loaded in each chat starting with the latest ones</param>
        /// <param name="continuationToken">Token used to retrieve further chats</param>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        ///
        /// If not all chats that the user is part of were requested, the continuation token will be added to the response.
        /// It should be added to the next request to load next chats.
        /// If there are no further chats to be loaded the value of the continuation token will be null.
        /// </remarks>
        /// <returns>Object containing information about the chats the user is part of along with the continuation token</returns>
        /// <response code="200">Object containing information about the chats the user is part of along with the continuation token</response>
        /// <response code="500">Error message</response>
        /// <response code="502">Error message</response>
        [HttpGet]
        [Route("Chat/GetChatsAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(GetChatsDTO), 200)]
        [ProducesResponseType(typeof(string), 500)]
        [ProducesResponseType(typeof(string), 502)]
        public async Task<IActionResult> GetChatsAsync(int pageSize, int messagePageSize, string? continuationToken = null)
        {
            var token = await GetTokenAsync();

            if (token.Token == "")
            {
                return StatusCode(502, "Error while creating an access token!");
            }

            var result = await _chatService.GetChatListAsync(pageSize, messagePageSize, GetUserId(), continuationToken, token);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            GetChatsDTO chatsDTO = (GetChatsDTO)result.Result;

            return Ok(chatsDTO);
        }

        /// <summary>
        /// Asynchronous method for loading information about the chat specified by an id
        /// </summary>
        /// <param name="chatId">Id of the chat</param>
        /// <param name="pageSize">Number specifying the number of messages to be loaded in the chat starting with the latest ones</param>
        /// <param name="continuationToken">Token used to retrieve further messages</param>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        ///
        /// If not all messages in the chat were requested, the continuation token will be added to the response.
        /// It should be added to the next request to load further messages in the same chat.
        /// If there are no further messages to be loaded the value of the continuation token will be null.
        /// </remarks>
        /// <returns>Object containing information about the messages in the chat along with the continuation token</returns>
        /// <response code="200">Object containing information about the messages in the chat along with the continuation token</response>
        /// <response code="500">Error message</response>
        /// <response code="502">Error message</response>
        [HttpGet]
        [Route("Chat/GetMessagesAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(GetMessagesDTO), 200)]
        [ProducesResponseType(typeof(string), 500)]
        [ProducesResponseType(typeof(string), 502)]
        public async Task<IActionResult> GetMessagesAsync(string chatId, int pageSize, string? continuationToken = null)
        {
            var token = await GetTokenAsync();

            if (token.Token == "")
            {
                return StatusCode(502, "Error while creating an access token!");
            }

            var result = await _chatService.GetChatMessagesAsync(chatId, GetUserId(), pageSize, continuationToken, token);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            GetMessagesDTO messagesDTO = (GetMessagesDTO)result.Result;

            return Ok(messagesDTO);
        }

        /// <summary>
        /// Asynchronous method for sending a message to the chat by the user that is currently logged in
        /// </summary>
        /// <param name="newMessage">Object containing information necessary to send a message</param>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <returns>Id of the sent messsage</returns>
        /// <response code="201">Id of the sent messsage</response>
        /// <response code="500">Error message</response>
        /// <response code="502">Error message</response>
        [HttpPost]
        [Route("Chat/SendMessageAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(string), 201)]
        [ProducesResponseType(typeof(string), 500)]
        [ProducesResponseType(typeof(string), 502)]
        public async Task<IActionResult> SendMessageAsync(SendMessageViewModel newMessage)
        {
            var token = await GetTokenAsync();

            if (token.Token == "")
            {
                return StatusCode(502, "Error while creating an access token!");
            }

            var result = await _chatService.SendMessageAsync(newMessage.ChatId, newMessage.Message, GetUserId(), token);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            string messageId = (string)result.Result;

            return StatusCode(201, messageId);
        }

        #endregion Methods
    }
}