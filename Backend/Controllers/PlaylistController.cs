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


        /// <summary>
        /// Asynchronous method for loading all playlists
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        ///
        /// The number of the first page is 1. Both "PageNumber" and "PageSize" have to be greater or equal to 1.
        ///
        /// The name filter will return playlists that are in the playlist's names (not case sensitive).
        /// </remarks>
        /// <param name="pagingInfo">Object containing information about paging, filtering and order</param>
        /// <returns>Object containing a list of playlists along with information about paging, filtering and tracks</returns>
        /// <response code="200">Object containing a list of playlists along with information about paging, filtering and tracks</response>
        /// <response code="500">Error message</response>
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

        /// <summary>
        /// Asynchronous method for loading a playlist specified by an id
        /// </summary>
        /// <param name="playlistId">Id of the playlist</param>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <returns>Object containing information about the track</returns>
        /// <response code="200">Object containing information about the playlist</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
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

        /// <summary>
        /// Asynchronous method for loading a playlist specified by an id with sorting and filtering values
        /// </summary>
        /// <param name="playlistId">Id of the playlist</param>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <returns>Object containing information about the track</returns>
        /// <response code="200">Object containing information about the playlist</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [HttpPost]
        [Route("Playlist/WIP/{playlistId}", Name = "WIP")]
        [ProducesResponseType(typeof(ReadPlaylistDTO), 200)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> WIP(int playlistId)
        {
            var result = await _playlistService.GetPlaylistAsync(playlistId);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            ReadPlaylistDTO playlistDTO = (ReadPlaylistDTO)result.Result;

            return Ok(playlistDTO);
        }

        /// <summary>
        /// Asynchronous method for getting the amount of tracks that are in the playlist specified by id
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks> 
        /// <param name="playlistId">Id of the playlist from which we want to know the amount of tracks</param>
        /// <returns>Object containing playlist's id, name and amount of tracks that are in it</returns>
        /// <response code="200">Object containing id, name and amount of tracks in a playlist</response>
        /// <response code="403">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [HttpGet]
        [Route("Playlist/GetAmountAsync/{playlistId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(GetPlaylistDataDTO), 200)]
        [ProducesResponseType(typeof(string), 403)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetAmountAsync(int playlistId)
        {
            int userId = GetUserId();

            var playlist = await _playlistService.GetPlaylistDataAsync(playlistId);

            if (playlist.IsSuccess == false)
            {
                return StatusCode(playlist.StatusCode, playlist.Message);
            }

            GetPlaylistDataDTO readPlaylistDTO = (GetPlaylistDataDTO)playlist.Result;

            if (userId != readPlaylistDTO.Author.Id)
            {
                return StatusCode(403, "You can't modify the playlist that you don't own");
            }

            return Ok(readPlaylistDTO);
        }

        /// <summary>
        /// Asynchronous method for adding a new empty playlist
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks> 
        /// <param name="playlistName">Name of the playlist that you want to create</param>
        /// <returns>Object containing information about a new playlist along with a route to the get method</returns>
        /// <response code="201">Playlist added succesfilly</response>
        /// <response code="409">Error message</response>
        /// <response code="500">Error message</response>
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

        /// <summary>
        /// Asynchronous method for deleting the playlist specified by id
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <param name="playlistId">Id of the playlist</param>
        /// <returns>Nothing if the method executes correctly and an error message if it doesn't</returns>
        /// <response code="204"></response>
        /// <response code="403">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
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

        /// <summary>
        /// Asynchronous method for updating an existing playlist's name
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <param name="playlistId">Id of the playlist</param>
        /// <param name="newName">New name for the playlist</param>
        /// <returns>Nothing if the method executes correctly and an error message if it doesn't</returns>
        /// <response code="204"></response>
        /// <response code="403">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
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
                return StatusCode(result.StatusCode, result.Message);
            }

            return StatusCode(204);

        }

        /// <summary>
        /// Asynchronous method for adding an existing track to an existing playlist
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks> 
        /// <param name="playlistId">Id of the playlist to which we want to add an existing track</param>
        /// <param name="trackId">Id of the track which we want to add an existing playlist</param>
        /// <returns>Nothing if the method executes correctly and an error message if it doesn't</returns>
        /// <response code="201">Track added succesfilly</response>
        /// <response code="403">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
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
                return StatusCode(result.StatusCode, result.Message);
            }

            return StatusCode(204);

        }

        /// <summary>
        /// Asynchronous method for deleting track from the playlist specified by id
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks> 
        /// <param name="playlistId">Id of the playlist from which we want to remove an existing track</param>
        /// <param name="trackId">Id of the track which we want to remove from an existing playlist</param>
        /// <returns>Nothing if the method executes correctly and an error message if it doesn't</returns>
        /// <response code="201">Track added succesfilly</response>
        /// <response code="403">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
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
                return StatusCode(result.StatusCode, result.Message);
            }

            return StatusCode(204);

        }


        #endregion Methods
    }
}
