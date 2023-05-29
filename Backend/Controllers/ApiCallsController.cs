using Backend.ViewModels.Library;
using Common.CustomDataAttributes;
using Data.DTOs.Library;
using Data.DTOs.Tracks;
using Data.Entities;
using Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace Backend.Controllers
{
    [ApiController]
    public class ApiCallsController : BaseController
    {
        #region Properties

        private readonly ApiCallsService _apiCallsService;
        private readonly TrackService _trackService;

        #endregion Properties

        #region Constructors

        public ApiCallsController(ApiCallsService apiCallsService, TrackService trackService)
        {
            _apiCallsService = apiCallsService;
            _trackService = trackService;
        }

        #endregion Constructors

        #region Methods
        /// <summary>
        /// Asynchronous method for calling Last.fm api to get track information
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <param name="artist">Name of the band/artist</param>
        /// <param name="trackName">Name of the track</param>
        [HttpGet]
        [Route("APICalls/GetTrackInfoAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(TrackInfoDTO), 200)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetTrackInfoAsync(string artist, string trackName)
        {
            var result = await _apiCallsService.GetTrackInfoAsync(artist, trackName);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            RetrieveTrackInfoDTO trackInfo = (RetrieveTrackInfoDTO)result.Result;

            return Ok(trackInfo);
        }
        /// <summary>
        /// Asynchronous method for calling Last.fm api to get list of tracks mathing the provided name
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <param name="name">Name of the track</param>

        [HttpGet]
        [Route("APICalls/GetSearchListAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        public async Task<IActionResult> GetSearchListAsync(string name)
        {
            var trackList = await _apiCallsService.GetSearchListAsync(name);
            if (trackList == null) return StatusCode(500, "Error");
            return Ok(trackList);
        }

        /// <summary>
        /// Asynchronous method for calling Last.fm api to get track information and automatically adding it to db.
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <param name="artist">Name of the band/artist</param>
        /// <param name="trackName">Name of the track</param>
        [HttpPost]
        [Route("APICalls/GetTrackInfoAndAddAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(TrackInfoDTO), 201)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetTrackInfoAndAddAsync(string artist, string trackName)
        {
            var resultFromApi = await _apiCallsService.GetTrackInfoAsync(artist, trackName);

            int UserId = GetUserId();

            if (resultFromApi.IsSuccess == false)
            {
                return StatusCode(resultFromApi.StatusCode, resultFromApi.Message);
            }

            RetrieveTrackInfoDTO trackInfo = (RetrieveTrackInfoDTO)resultFromApi.Result;

            TrackInfoDTO trackInfoDTO = new TrackInfoDTO()
            {
                TrackName = trackInfo.TrackName,
                Band = trackInfo.Band,
                Genre = trackInfo.Genre ?? "No know genre",
                LinkToCover = trackInfo.LinkToCover ?? "No link to cover",
                UserId = UserId
            };

            var result = await _trackService.AddTrackAsync(trackInfoDTO);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            ReadTrackInfoDTO trackDTO = (ReadTrackInfoDTO)result.Result;

            return StatusCode(201);
        }

        #endregion Methods

    }
}
