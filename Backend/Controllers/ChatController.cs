using Azure.Core;
using Backend.ViewModels.Chat;
using Common.CustomDataAttributes;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost]
        [Route("Chat/Create")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        public async Task<IActionResult> CreateChat(CreateChatViewModel newChat)
        {
            AccessToken token = JsonSerializer.Deserialize<AccessToken>(Request.Cookies["ChatToken"]);

            if (token.ExpiresOn.Date.AddSeconds(10) > DateTime.Now)
            {
                token = await _chatService.RefreshTokensAsync(GetUserId());

                if (token.Token == "")
                {
                    return StatusCode(502, "Error while getting an access token");
                }

                Response.Cookies.Append("ChatToken", JsonSerializer.Serialize(token));
            }

            var result = await _chatService.CreateChatAsync(newChat.Topic, newChat.ParticipantsIds, token);

            if (result == null)
            {
                return BadRequest("Error while creating the chat!");
            }

            return Ok(result);
        }

        #endregion Methods
    }
}