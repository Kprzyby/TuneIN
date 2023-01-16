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
            Dictionary<string, object>.ValueCollection tokenValues = (Dictionary<string, object>.ValueCollection)tokenObject.GetType().GetProperty("Values").GetValue(tokenObject);
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

        /// <summary> Creates a chat </summary>
        /// <param name="newChat">Object of the CreateChatViewModel class containing information about the new chat</param>
        /// <returns>IActionResult</returns>
        /// <remarks>
        /// <h2>Nullable</h2>
        ///    Topic
        /// <h2>Example request</h2>
        ///
        ///     {
        ///       "Topic": "Urodziny Gosi",
        ///       "ParticipantsIds": [1,2,3]
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Id of the created chat</response>
        /// <response code="400">string "Error while creating the chat"</response>
        [HttpPost]
        [Route("Chat/CreateChatAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateChatAsync(CreateChatViewModel newChat)
        {
            var token = await GetTokenAsync();

            if (token.Token == "")
            {
                return StatusCode(502, "Error while creating an access token!");
            }

            newChat.ParticipantsIds.Add(GetUserId());

            var result = await _chatService.CreateChatAsync(newChat.Topic, newChat.ParticipantsIds, token);

            if (result == null)
            {
                return BadRequest("Error while creating the chat!");
            }

            return StatusCode(201, result);
        }

        /// <summary> Gets a chat </summary>
        /// <param name="chatId">Id of the chat that you want to get</param>
        /// <param name="pageSize">The amount of messages in the chat that you want to get</param>
        /// <returns>IActionResult</returns>
        /// <response code="200">Object of the GetChatDTO class containing information about the chat</response>
        /// <response code="400">string "Wrong chat id!"</response>
        [HttpGet]
        [Route("Chat/GetChatAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(GetChatDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetChatAsync(string chatId, int pageSize)
        {
            var token = await GetTokenAsync();

            var result = await _chatService.GetChatAsync(chatId, pageSize, GetUserId(), token);

            if (result == null)
            {
                return BadRequest("Wrong chat id!");
            }

            return Ok(result);
        }

        /// <summary> Gets the chats that the user is part of </summary>
        /// <param name="pageSize">The amount of chats that you want to get</param>
        /// <param name="messagePageSize">The amount of messages in each chat that you want to get</param>
        /// <param name="continuationToken">If pageSize was less than the amount of chats
        /// available during the last time this method was invoked and this parameter is
        /// provided the method will return next chats in the amount equal to the
        /// pageSize parameter </param>
        /// <remarks>
        /// <h2>Nullable</h2>
        ///    continuationToken
        /// </remarks>
        /// <returns>IActionResult</returns>
        /// <response code="200">Object of the GetChatsDTO class containing information
        /// about the chats, if not all of the chats were included in the response the
        /// object will contain a continuation token</response>
        /// <response code="400">string "Error while getting chats!"</response>
        [HttpGet]
        [Route("Chat/GetChatsAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(GetChatsDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetChatsAsync(int pageSize, int messagePageSize, string? continuationToken = null)
        {
            var token = await GetTokenAsync();

            var result = await _chatService.GetChatListAsync(pageSize, messagePageSize, GetUserId(), continuationToken, token);

            if (result == null)
            {
                return BadRequest("Error while getting chats!");
            }

            return Ok(result);
        }

        /// <summary> Gets the messages in the chat </summary>
        /// <param name="chatId">Id of the chat that you want to get messages from</param>
        /// <param name="pageSize">The amount of messages that you want to get</param>
        /// <param name="continuationToken">If pageSize was less than the amount of messages
        /// available during the last time this method was invoked and this parameter is
        /// provided the method will return next messages in the amount equal to the
        /// pageSize parameter </param>
        /// <remarks>
        /// <h2>Nullable</h2>
        ///    continuationToken
        /// </remarks>
        /// <returns>IActionResult</returns>
        /// <response code="200">Object of the GetMessagesDTO class containing information
        /// about the messages in the chat, if not all of the messagse were included in
        /// the response the object will contain a continuation token</response>
        /// <response code="400">string "Error while getting the messages!"</response>
        [HttpGet]
        [Route("Chat/GetMessagesAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(GetMessagesDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetMessagesAsync(string chatId, int pageSize, string? continuationToken = null)
        {
            var token = await GetTokenAsync();

            var result = await _chatService.GetChatMessagesAsync(chatId, GetUserId(), pageSize, continuationToken, token);

            if (result == null)
            {
                return BadRequest("Error while getting the messages!");
            }

            return Ok(result);
        }

        /// <summary> Sends the message in the chat </summary>
        /// <param name="newMessage">Object of the SendMessageViewModel class containing the infotmation about the message </param>
        /// <remarks>
        /// <h2>Example request</h2>
        ///
        ///     {
        ///       "ChatId": "21:bysasdz-zt2mA05YvI0mwkZ_ImkUir4AkP8RjM4iBUo1@thread.v2",
        ///       "Message": "Hello, my name is Gregor!"
        ///     }
        ///
        /// </remarks>
        /// <returns>IActionResult</returns>
        /// <response code="201">Id of the created message</response>
        /// <response code="400">string "Wrong chat id!"</response>
        [HttpPost]
        [Route("Chat/SendMessageAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SendMessageAsync(SendMessageViewModel newMessage)
        {
            var token = await GetTokenAsync();

            var result = await _chatService.SendMessageAsync(newMessage.ChatId, newMessage.Message, GetUserId(), token);

            if (result == null)
            {
                return BadRequest("Wrong chat id!");
            }

            return StatusCode(201, result);
        }

        /// <summary> Adds a participant/participants to the chat </summary>
        /// <param name="chatId">Id of the chat that you want to add participants to</param>
        /// <param name="participantsIds">List of ids of the application users that you want to add to the chat</param>
        /// <returns>IActionResult</returns>
        /// <response code="200">string "Chat participants added successfully"</response>
        /// <response code="400">string "Error while adding chat participants"</response>
        [HttpPut]
        [Route("Chat/AddParticipantsAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddParticipantsAsync(string chatId, List<int> participantsIds)
        {
            var token = await GetTokenAsync();

            var result = await _chatService.AddParticipantsAsync(token, chatId, participantsIds);

            if (result == false)
            {
                return BadRequest("Error while adding chat participants");
            }

            return Ok("Chat participants added successfully");
        }

        /// <summary> Removes a participant from the chat </summary>
        /// <param name="chatId">Id of the chat that you want to remove a participant from</param>
        /// <param name="participantId">Id of the application user that you want to remove from the chat</param>
        /// <returns>IActionResult</returns>
        /// <response code="200">string "Participant successfully removed"</response>
        /// <response code="400">string "Error while removing participant"</response>
        [HttpDelete]
        [Route("Chat/RemoveParticipantAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RemoveParticipantAsync(string chatId, int participantId)
        {
            var token = await GetTokenAsync();

            var result = await _chatService.RemoveParticipantAsync(token, chatId, participantId);

            if (result == false)
            {
                return BadRequest("Error while removing participant");
            }

            return Ok("Participant successfully removed");
        }

        /// <summary> Updates the topic of the chat </summary>
        /// <param name="chatId">Id of the chat whose topic you want to update</param>
        /// <param name="topic">New topic of the chat</param>
        /// <returns>IActionResult</returns>
        /// <response code="200">string "Topic updated successfully"</response>
        /// <response code="400">string "Error while updating the topic"</response>
        [HttpPut]
        [Route("Chat/UpdateTopicAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateTopicAsync(string chatId, string topic)
        {
            var token = await GetTokenAsync();

            var result = await _chatService.UpdateTopicAsync(token, chatId, topic);

            if (result == false)
            {
                return BadRequest("Error while updating the topic");
            }

            return Ok("Topic updated successfully");
        }

        #endregion Methods
    }
}