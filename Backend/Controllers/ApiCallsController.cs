using Backend.ViewModels.Library;
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

        [HttpGet]
        [Route("APICalls/GetTrackInfo")]
        public async Task<IActionResult> GetTrackInfoAsync(string artist, string trackName)
        {
            Console.WriteLine("Works");
            var trackInfo = await _apiCallsService.GetTrackInfoAsync(artist, trackName);
            if (trackInfo == null) return BadRequest("Error");
            if ((string)trackInfo["message"] == "Track not found") return BadRequest("Not Found");
            TrackViewModel trackViewModel = new TrackViewModel
            {
                MbId = (int)trackInfo["track"]["mbid"],
                TrackName = (string)trackInfo["track"]["name"],
                Band = (string)trackInfo["track"]["artist"]["name"],
                Genre = (string)trackInfo["track"]["toptags"]["tag"][0]["name"],
                LinkToCover = (string)trackInfo["track"]["album"]["image"][3]["#text"]
            };

            return Ok(trackViewModel);
        }

        [HttpGet]
        [Route("APICalls/GetSearchList")]
        public async Task<IActionResult> GetSearchListAsync(string name)
        {
            Console.WriteLine("Works");
            var trackList = await _apiCallsService.GetSearchListAsync(name);
            if (trackList == null) return BadRequest("Error");
            return Ok(trackList);
        }

        #endregion Methods

    }
}
