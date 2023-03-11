using Common.CustomDataAttributes;
using Microsoft.AspNetCore.Mvc;
using Backend.ViewModels.Library;
using Services;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Data.DTOs.Library;

namespace Backend.Controllers
{
    [ApiController]
    public class LibraryController : Controller
    {
        #region Properties

        private readonly LibraryService _libraryService;

        #endregion Properties

        #region Constructors

        public LibraryController(LibraryService libraryService)
        {
            _libraryService = libraryService;
        }

        #endregion Constructors

        #region Methods

        [HttpGet]
        [Route("Library/GetTracks")]
        public async Task<IActionResult> GetTracksAsync()
        {
            var tracks = _libraryService.GetTracksAsync();
            return Ok(tracks);
        }
        [HttpGet]
        [Route("Library/GetTracksFiltered")]
        public async Task<IActionResult> GetTracksFilteredByTrackNameAsync(string trackName)
        {
            var tracks = _libraryService.GetTracksFilteredByTrackNameAsync(trackName);
            return Ok(tracks);
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
                TrackName = (string)trackInfo["track"]["name"],
                Band = (string)trackInfo["track"]["artist"]["name"],
                Genre = (string)trackInfo["track"]["toptags"]["tag"][0]["name"],
                LinkToCover = (string)trackInfo["track"]["album"]["image"][3]["#text"]
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

        [HttpPost]
        [Route("Library/AddNewTrack")]
        public async Task<IActionResult> AddTrackAsync(TrackViewModel trackInfo)
        {
            
            bool trackExists = await _libraryService.CheckIfTrackExistsAsync(trackInfo.Band, trackInfo.TrackName);

            if (trackExists == true)
            {
                return StatusCode(409, "This track already exists in library");
            }
            
            TrackInfoDTO trackInfoDTO = new TrackInfoDTO()
            {
                TrackName = trackInfo.TrackName, 
                Band = trackInfo.Band,
                Genre = trackInfo.Genre,
                LinkToCover= trackInfo.LinkToCover,
            };

            var createResult = await _libraryService.AddTrackAsync(trackInfoDTO);

            if (createResult == false)
            {
                return StatusCode(500, "Error while adding new track!");
            }

            return StatusCode(201, "Track added successfully!");
        }

        [HttpDelete]
        [Route("Library/RemoveTrack")]
        public async Task<IActionResult> RemoveTrackById(int id)
        {
            bool trackExists = await _libraryService.CheckIfTrackExistsByIdAsync(id);

            if (trackExists == false)
            {
                return StatusCode(409, "This track doesn't exist in library");
            }

            var createResult = await _libraryService.RemoveTracksAsync(id);

            if (createResult == false)
            {
                return StatusCode(500, "Error while removing track!");
            }

            return StatusCode(201, "Track removed successfully!");
        }



        #endregion Methods
    }
}