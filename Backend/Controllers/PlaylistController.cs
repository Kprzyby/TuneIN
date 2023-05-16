using Common.CustomDataAttributes;
using Microsoft.AspNetCore.Mvc;
using Backend.ViewModels.Library;
using Services;
using Data.DTOs.Library;
using Data.DTOs.Playlist;
using Data.Entities;
using Backend.ViewModels.Playlist;

namespace Backend.Controllers
{
    [ApiController]
    public class PlaylistController : BaseController
    {
        #region Properties

        private readonly PlaylistService _playlistService;
        private readonly TrackService _trackService;

        #endregion Properties

        #region Constructors

        public PlaylistController(PlaylistService playlistService, TrackService trackService)
        {
            _playlistService = playlistService;
            _trackService = trackService;
        }

        #endregion Constructors

        #region Methods  

        [HttpPost]
        [Route("Playlist/GetPlaylistsAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(GetPlaylistsResponseDTO), 200)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetPlaylistsAsync(GetPlaylistsViewModel pagingInfo)
        {
            int UserId = GetUserId();

            GetPlaylistsDTO dto = new GetPlaylistsDTO()
            {
                PageNumber = pagingInfo.PageNumber,
                PageSize = pagingInfo.PageSize,
                PlaylistNameFilterValue = pagingInfo.PlaylistNameFilterValue,
                UserIdFilterValue = UserId
            };

            var result = await _playlistService.GetPlaylistsAsync(dto);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            GetPlaylistsResponseDTO tracks = (GetPlaylistsResponseDTO)result.Result;

            return Ok(tracks);
        }


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

        [HttpDelete]
        [Route("Playlist/DeletePlaylistAsync/{playlistId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(void), 204)]
        [ProducesResponseType(typeof(string), 403)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> DeletePlaylistAsync(int playlistId)
        {
            int userId = GetUserId();
            var oldPlaylist = await _playlistService.GetPlaylistAsync(playlistId);

            if (oldPlaylist.IsSuccess == false)
            {
                return StatusCode(oldPlaylist.StatusCode, oldPlaylist.Message);
            }

            ReadPlaylistDTO oldPlaylistDTO = (ReadPlaylistDTO)oldPlaylist.Result;

            if (userId != oldPlaylistDTO.Author.Id)
            {
                return StatusCode(403, "You can't modify the playlist that you don't own");
            }

            var result = await _playlistService.RemovePlaylistAsync(playlistId);

            if (result == false)
            {
                return StatusCode(500, "Error while removing the playlist!");
            }

            return StatusCode(204);
        }

        [HttpPut]
        [Route("Playlist/ChangePlaylistNameAsync/{playlistId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(void), 204)]
        [ProducesResponseType(typeof(void), 403)]
        [ProducesResponseType(typeof(void), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> ChangePlaylistNameAsync(int playlistId, string newName)
        {
            int userId = GetUserId();
            var oldPlaylist = await _playlistService.GetPlaylistAsync(playlistId);

            if (oldPlaylist.IsSuccess == false)
            {
                return StatusCode(oldPlaylist.StatusCode, oldPlaylist.Message);
            }

            ReadPlaylistDTO readPlaylistDTO = (ReadPlaylistDTO)oldPlaylist.Result;

            if (userId != readPlaylistDTO.Author.Id)
            {
                return StatusCode(403, "You can't modify the playlist that you don't own");
            }

            var result = await _playlistService.UpdatePlaylistAsync(playlistId, newName);

            if (result.IsSuccess == false)
            {
                StatusCode(result.StatusCode, result.Message);
            }

            return StatusCode(204);

        }

        [HttpPut]
        [Route("Playlist/AddTrackToPlaylistAsync/{playlistId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(void), 204)]
        [ProducesResponseType(typeof(string), 403)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> AddTrackToPlaylistAsync(int playlistId, int trackId)
        {
            bool trackExists = await _trackService.CheckIfTrackExistsAsync(trackId);
            int userId = GetUserId();

            if (trackExists == false)
            {
                return StatusCode(409, "This track doesn't exist");
            }

            var oldPlaylist = await _playlistService.GetPlaylistAsync(playlistId);

            if (oldPlaylist.IsSuccess == false)
            {
                return StatusCode(oldPlaylist.StatusCode, oldPlaylist.Message);
            }

            ReadPlaylistDTO readPlaylistDTO = (ReadPlaylistDTO)oldPlaylist.Result;

            if (userId != readPlaylistDTO.Author.Id)
            {
                return StatusCode(403, "You can't modify the playlist that you don't own");
            }

            var result = await _playlistService.AddTrackToPlaylistAsync(playlistId, trackId);

            if (result.IsSuccess == false)
            {
                StatusCode(result.StatusCode, result.Message);
            }

            return StatusCode(204);

        }

        [HttpDelete]
        [Route("Playlist/DeleteTrackFromPlaylistAsync/{playlistId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(void), 204)]
        [ProducesResponseType(typeof(string), 403)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> DeleteTrackFromPlaylistAsync(int playlistId, int trackId)
        {
            bool trackExists = await _trackService.CheckIfTrackExistsAsync(trackId);
            int userId = GetUserId();

            if (trackExists == false)
            {
                return StatusCode(409, "This track doesn't exist");
            }

            var oldPlaylist = await _playlistService.GetPlaylistAsync(playlistId);

            if (oldPlaylist.IsSuccess == false)
            {
                return StatusCode(oldPlaylist.StatusCode, oldPlaylist.Message);
            }

            ReadPlaylistDTO readPlaylistDTO = (ReadPlaylistDTO)oldPlaylist.Result;

            if (userId != readPlaylistDTO.Author.Id)
            {
                return StatusCode(403, "You can't modify the playlist that you don't own");
            }

            var result = await _playlistService.DeleteTrackFromPlaylistAsync(playlistId, trackId);

            if (result.IsSuccess == false)
            {
                StatusCode(result.StatusCode, result.Message);
            }

            return StatusCode(204);

        }

        #endregion Methods
    }
}
