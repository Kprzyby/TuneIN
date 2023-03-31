using Common.CustomDataAttributes;
using Microsoft.AspNetCore.Mvc;
using Backend.ViewModels.Library;
using Services;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Data.DTOs.Library;
using System.Diagnostics;
using Data.DTOs.Tutorship;
using Backend.ViewModels.Tutorship;

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
        /// <summary>
        /// Asynchronous method for loading all trackInfos
        /// </summary>
        /// <remarks>
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
        [Route("Library/GetTracksAsync")]
        [ProducesResponseType(typeof(GetTracksResponseDTO), 200)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetTracksAsync(GetTracksViewModel pagingInfo)
        {
            GetTracksDTO dto = new GetTracksDTO()
            {
                PageNumber = pagingInfo.PageNumber,
                PageSize = pagingInfo.PageSize,
                TrackNameFilterValue = pagingInfo.TrackNameFilterValue,
                BandFilterValue = pagingInfo.BandFilterValue,
                GenreFilterValue = pagingInfo.GenreFilterValue
            };

            var tracks = await _libraryService.GetTracksAsync(dto);

            if (tracks == null)
            {
                return StatusCode(500, "Error while loading tracks");
            }

            return Ok(tracks);
        }
        [HttpGet]
        [Route("Library/GetTracksFiltered")]
        public async Task<IActionResult> GetTracksFilteredByTrackNameAsync(string trackName)
        {
            var tracks = await _libraryService.GetTracksFilteredByTrackNameAsync(trackName);
            return Ok(tracks);
        }


        [HttpPost]
        [Route("Library/AddNewTrackAsync")]
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
                LinkToCover = trackInfo.LinkToCover,
            };

            var createResult = await _libraryService.AddTrackAsync(trackInfoDTO);

            if (createResult == false)
            {
                return StatusCode(500, "Error while adding new track!");
            }

            return StatusCode(201, "Track added successfully!");
        }

        [HttpDelete]
        [Route("Library/RemoveTrackAsync")]
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