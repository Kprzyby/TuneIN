using Microsoft.AspNetCore.Mvc;
using Services;

namespace Backend.Controllers
{
    [ApiController]
    public class ChatController : Controller
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

        [Route("Chat/Create")]
        public async Task<IActionResult> CreateChat()
        {
            return View();
        }

        #endregion Methods
    }
}