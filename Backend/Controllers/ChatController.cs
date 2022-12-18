using Azure.Core;
using Backend.ViewModels.Chat;
using Common.CustomDataAttributes;
using FastMember;
using Microsoft.AspNetCore.Mvc;
using Nancy.Json;
using Newtonsoft.Json;
using Services;
using System.Text.Json;

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

        [HttpPost]
        [Route("Chat/CreateChatAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
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

        [HttpGet]
        [Route("Chat/GetChatAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
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

        [HttpGet]
        [Route("Chat/GetMessagesAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
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

        [HttpPost]
        [Route("Chat/SendMessageAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
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

        #endregion Methods
    }
}