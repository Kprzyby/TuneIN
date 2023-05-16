using Common.CustomDataAttributes;
using Microsoft.AspNetCore.Mvc;
using Backend.ViewModels.Library;
using Services;
using Data.DTOs.Library;
using Data.DTOs.Playlist;
using Data.Entities;

namespace Backend.Controllers
{
    [ApiController]
    public class PlaylistController : BaseController
    {
        #region Properties

        private readonly PlaylistService _playlistService;

        #endregion Properties

        #region Constructors

        public PlaylistController(PlaylistService playlistService)
        {
            _playlistService = playlistService;
        }

        #endregion Constructors

        #region Methods  
        
        [HttpGet]
        [Route("Playlist/GetPlaylistAsync/{playlistId}", Name = "GetPlaylistAsync")]
        [ProducesResponseType(typeof(ReadPlaylistDTO), 200)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetPlaylistAsync(int playlistId)
        {
            var result = await _playlistService.GetPlaylistAsync(playlistId);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            ReadPlaylistDTO playlistDTO = (ReadPlaylistDTO)result.Result;

            return Ok(playlistDTO);
        }

        [HttpPost]
        [Route("Playlist/AddPlaylistAsync/{playlistName}", Name = "AddPlaylistAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(string), 201)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> AddPlaylistAsync(string playlistName)
        {
            int UserId = GetUserId();

            var result = await _playlistService.AddPlaylistAsync(playlistName, UserId);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            ReadPlaylistDTO playlistDTO = (ReadPlaylistDTO)result.Result;

            return CreatedAtRoute("GetPlaylistAsync", new { playlistId = playlistDTO.Id }, playlistDTO);
        }

        #endregion Methods
    }
}
