using Common.CustomDataAttributes;
using Microsoft.AspNetCore.Mvc;
using Backend.ViewModels.Library;
using Services;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [ApiController]
    public class LibraryController : Controller
    {
        #region Properties

        private readonly FetchService _fetchService;
        private readonly LibraryService _libraryService;

        #endregion Properties

        #region Constructors

        public LibraryController(FetchService fetchService, LibraryService libraryService)
        {
            _fetchService = fetchService;
            _libraryService = libraryService;
        }

        #endregion Constructors

        #region Methods

        [RequireRole("REGULAR_USER", "TUTOR")]
        [HttpGet]
        [Route("Library/GetURL")]
        public async Task<IActionResult> GetURLAsync(string url)
        {
            Console.WriteLine("Works");
            var link = await _fetchService.GetURL(url);
            return Ok(link);
        }

        [HttpGet]
        [Route("Library/GetTrackInfo")]
        public async Task<IActionResult> GetTrackInfoAsync(string artist, string trackName)
        {
            Console.WriteLine("Works");
            var trackInfo = await _libraryService.GetTrackInfoAsync(artist, trackName);
            if (trackInfo == null) return BadRequest("Error");
            if ((string)trackInfo["message"] == "Track not found") return BadRequest("Not Found");
            TrackViewModel trackViewModel = new TrackViewModel
            {
                Name = (string)trackInfo["track"]["name"],
                Band = (string)trackInfo["track"]["artist"]["name"],
                Genre = (string)trackInfo["track"]["toptags"]["tag"][0]["name"],
                CoverLink = (string)trackInfo["track"]["album"]["image"][2]["#text"]
            };

            return Ok(trackViewModel);
        }

        [HttpGet]
        [Route("Library/GetSearchList")]
        public async Task<IActionResult> GetSearchListAsync(string name)
        {
            Console.WriteLine("Works");
            var trackList = await _libraryService.GetSearchListAsync(name);
            if (trackList == null) return BadRequest("Error");
            return Ok(trackList);
        }

        #endregion Methods
    }
}