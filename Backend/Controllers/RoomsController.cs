using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace Backend.Controllers
{
    [ApiController]
    public class RoomsController : Controller
    {

        #region Properties

        private readonly RoomsService _roomsService;

        #endregion

        #region Constructors

        public RoomsController(RoomsService roomsService)
        {
            _roomsService = roomsService;
        }

        #endregion

        #region Methods

        [AllowAnonymous]
        [HttpGet]
        [Route("Rooms/GetActiveRoomsAsync")]
        public async Task<IActionResult> GetActiveRoomsAsync()
        {

            var rooms = await _roomsService.GetRoomsAsync();

            if(rooms == null)
                return StatusCode(500, "Error accessing rooms");

            return Ok(rooms);
        }

        #endregion

    }
}
