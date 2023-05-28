using Common.CustomDataAttributes;
using Microsoft.AspNetCore.Mvc;
using Backend.ViewModels.Library;
using Services;
using Data.DTOs.Library;

namespace Backend.Controllers
{
    [ApiController]
    public class TrackController : BaseController
    {
        #region Properties

        private readonly TrackService _trackService;

        #endregion Properties

        #region Constructors

        public TrackController(TrackService trackService)
        {
            _trackService = trackService;
        }

        #endregion Constructors

        #region Methods   


        /// <summary>
        /// Asynchronous method for loading a track specified by an id
        /// </summary>
        /// <param name="trackId">Id of the track</param>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <returns>Object containing information about the track</returns>
        /// <response code="200">Object containing information about the track</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [HttpGet]
        [Route("Tracks/GetTrackAsync/{trackId}", Name = "GetTrackAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(ReadTrackInfoDTO), 200)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetTrackAsync(int trackId)
        {
            var result = await _trackService.GetTrackAsync(trackId);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            ReadTrackInfoDTO trackInfoDTO = (ReadTrackInfoDTO)result.Result;

            return Ok(trackInfoDTO);
        }


        /// <summary>
        /// Asynchronous method for loading all trackInfos
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        ///
        /// The number of the first page is 1. Both "PageNumber" and "PageSize" have to be greater or equal to 1.
        ///
        /// The trackName filter will return trackInfos that start with the given value (not case sensitive).
        /// The band filter will return trackInfos that start with the given value (not case sensitive).
        /// The genre filter will return trackInfos which genre exactly matches the one provided (not case sensitive).
        /// </remarks>
        /// <param name="pagingInfo">Object containing information about paging, filtering and order</param>
        /// <returns>Object containing a list of trackInfos along with information about paging and filtering</returns>
        /// <response code="200">Object containing a list of trackInfos along with information about paging and filtering</response>
        /// <response code="500">Error message</response>
        [HttpPost]
        [Route("Tracks/GetTracksAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(GetTracksResponseDTO), 200)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetTracksAsync(GetTracksViewModel pagingInfo)
        {
            int UserId = GetUserId();

            GetTracksDTO dto = new GetTracksDTO()
            {
                PageNumber = pagingInfo.PageNumber,
                PageSize = pagingInfo.PageSize,
                TrackNameFilterValue = pagingInfo.TrackNameFilterValue,
                BandFilterValue = pagingInfo.BandFilterValue,
                GenreFilterValue = pagingInfo.GenreFilterValue,
                UserIdFilterValue = UserId
            };

            var result = await _trackService.GetTracksAsync(dto);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            GetTracksResponseDTO tracks = (GetTracksResponseDTO)result.Result;

            return Ok(tracks);
        }

        /// <summary>
        /// Asynchronous method for adding a new track
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks> 
        /// <param name="trackInfo">Object containing information about the track</param>
        /// <returns>Object containing information about a new track along with a route to the get method</returns>
        /// <response code="201">Track added succesfilly</response>
        /// <response code="409">Error message</response>
        /// <response code="500">Error message</response>
        [HttpPost]
        [Route("Tracks/AddTrackAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(typeof(string), 409)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> AddTrackAsync(TrackViewModel trackInfo)
        {

            bool trackExists = await _trackService.CheckIfTrackExistsAsync(trackInfo.Band, trackInfo.TrackName);
            int UserId = GetUserId();

            if (trackExists == true)
            {
                return StatusCode(409, "This track already exists in library");
            }

            TrackInfoDTO trackInfoDTO = new TrackInfoDTO()
            {
                TrackName = trackInfo.TrackName,
                Band = trackInfo.Band,
                Genre = trackInfo.Genre,
                LinkToCover = trackInfo.LinkToCover,
                UserId = UserId
            };

            var result = await _trackService.AddTrackAsync(trackInfoDTO);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }


            return Ok();
        }

        /// <summary>
        /// Asynchronous method for updating an existing trackInfo
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <param name="trackId">Id of the track</param>
        /// <param name="trackInfo">Object containing new information about the track</param>
        /// <returns>Nothing if the method executes correctly and an error message if it doesn't</returns>
        /// <response code="204"></response>
        /// <response code="403">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [HttpPut]
        [Route("Tracks/UpdateTrackInfoAsync/{trackId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(void), 204)]
        [ProducesResponseType(typeof(void), 403)]
        [ProducesResponseType(typeof(void), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> UpdateTrackInfoAsync(int trackId, UpdateTrackViewModel trackInfo)
        {
            int userId = GetUserId();
            var oldTrack = await _trackService.GetTrackAsync(trackId);

            if (oldTrack.IsSuccess == false)
            {
                return StatusCode(oldTrack.StatusCode, oldTrack.Message);
            }

            ReadTrackInfoDTO oldTrackDTO = (ReadTrackInfoDTO)oldTrack.Result;

            if (userId != oldTrackDTO.Author.Id)
            {
                return StatusCode(403, "You can't modify the track that you don't own");
            }

            UpdateTrackDTO dto = new UpdateTrackDTO()
            {
                Id = trackId,
                TrackName = trackInfo.TrackName,
                Band = trackInfo.Band,
                Genre = trackInfo.Genre
            };

            var result = await _trackService.UpdateTrackInfoAsync(dto);

            if (result.IsSuccess == false)
            {
                StatusCode(result.StatusCode, result.Message);
            }

            return StatusCode(204);

        }

        /// <summary>
        /// Asynchronous method for deleting the track specified by id
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <param name="trackId">Id of the track</param>
        /// <returns>Nothing if the method executes correctly and an error message if it doesn't</returns>
        /// <response code="204"></response>
        /// <response code="403">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [HttpDelete]
        [Route("Tracks/DeleteTrackAsync/{trackId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(void), 204)]
        [ProducesResponseType(typeof(string), 403)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> DeleteTrackAsync(int trackId)
        {
            int userId = GetUserId();
            var oldTrack = await _trackService.GetTrackAsync(trackId);

            if (oldTrack.IsSuccess == false)
            {
                return StatusCode(oldTrack.StatusCode, oldTrack.Message);
            }

            ReadTrackInfoDTO oldTrackDTO = (ReadTrackInfoDTO)oldTrack.Result;

            if (userId != oldTrackDTO.Author.Id)
            {
                return StatusCode(403, "You can't modify the track that you don't own");
            }

            var result = await _trackService.RemoveTracksAsync(trackId);

            if (result == false)
            {
                return StatusCode(500, "Error while removing track!");
            }

            return StatusCode(204);
        }



        #endregion Methods
    }
}