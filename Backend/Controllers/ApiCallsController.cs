using Backend.ViewModels.Library;
using Common.CustomDataAttributes;
using Data.DTOs.Library;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace Backend.Controllers
{
    [ApiController]
    public class ApiCallsController : Controller
    {
        #region Properties
        private readonly ApiCallsService _apiCallsService;


        #endregion Properties

        #region Constructors

        public ApiCallsController(ApiCallsService apiCallsService)
        {
            _apiCallsService = apiCallsService;
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
        [Route("APICalls/GetTrackInfo")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(TrackViewModel), 200)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetTrackInfoAsync(string artist, string trackName)
        {
            var trackInfo = await _apiCallsService.GetTrackInfoAsync(artist, trackName);
            if (trackInfo == null)
            {
                return BadRequest("Error");

            }
            if ((string)trackInfo["message"] == "Track not found") return StatusCode(500, "Track not found");
            TrackViewModel trackViewModel = new TrackViewModel
            {
                TrackName = (string)trackInfo["track"]["name"],
                Band = (string)trackInfo["track"]["artist"]["name"],
                Genre = (string)trackInfo["track"]["toptags"]["tag"][0]["name"],
                LinkToCover = (string)trackInfo["track"]["album"]["image"][3]["#text"]
            };

            return Ok(trackViewModel);
        }
        /// <summary>
        /// Asynchronous method for calling Last.fm api to get list of tracks mathing the provided name
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <param name="name">Name of the track</param>

        [HttpGet]
        [Route("APICalls/GetSearchList")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        public async Task<IActionResult> GetSearchListAsync(string name)
        {
            var trackList = await _apiCallsService.GetSearchListAsync(name);
            if (trackList == null) return StatusCode(500, "Error");
            return Ok(trackList);
        }

        #endregion Methods

    }
}
