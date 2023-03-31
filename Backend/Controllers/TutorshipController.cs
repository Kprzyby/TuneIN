using Backend.ViewModels.Tutorship;
using Common.CustomDataAttributes;
using Data.DTOs.Tutorship;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace Backend.Controllers
{
    [ApiController]
    public class TutorshipController : BaseController
    {
        #region Constructors

        public TutorshipController(TutorshipService tutorshipService)
        {
            _tutorshipService = tutorshipService;
        }

        #endregion Constructors

        #region Properties

        private readonly TutorshipService _tutorshipService;

        #endregion Properties

        #region Methods

        /// <summary>
        /// Asynchronous method for loading a tutorship specified by an id
        /// </summary>
        /// <param name="tutorshipId">Id of the tutorship</param>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <returns>Object containing information about the tutorship</returns>
        /// <response code="200">Object containing information about the tutorship</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [HttpGet("Tutorship/GetTutorshipAsync/{tutorshipId}", Name = "GetTutorshipAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(ReadTutorshipDTO), 200)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetTutorshipAsync(int tutorshipId)
        {
            var result = await _tutorshipService.GetTutorshipAsync(tutorshipId);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            ReadTutorshipDTO tutorshipDTO = (ReadTutorshipDTO)result.Result;

            return Ok(tutorshipDTO);
        }

        /// <summary>
        /// Asynchronous method for loading all tutorships
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        ///
        /// The number of the first page is 1. Both "PageNumber" and "PageSize" have to be greater or equal to 1.
        ///
        /// The "SortInfo" parameter's key has to be "Price" and its value either "asc" or "desc" depending on the desired sort order.
        /// If this parameter is not provided, the tutorships will be sorted by title ascendingly.
        ///
        /// The title filter will return tutorships that start with the given value (not case sensitive).
        /// The category filter will return tutorships which category exactly matches the one provided (not case sensitive).
        /// </remarks>
        /// <param name="pagingInfo">Object containing information about paging, filtering and order</param>
        /// <returns>Object containing a list of tutorships along with information about paging, filtering and order</returns>
        /// <response code="200">Object containing a list of tutorships along with information about paging, filtering and order</response>
        /// <response code="500">Error message</response>
        [HttpPost]
        [Route("Tutorship/GetTutorshipsAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(GetTutorshipsResponseDTO), 200)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetTutorshipsAsync(GetTutorshipsViewModel pagingInfo)
        {
            GetTutorshipsDTO dto = new GetTutorshipsDTO()
            {
                PageNumber = pagingInfo.PageNumber,
                PageSize = pagingInfo.PageSize,
                SortInfo = pagingInfo.SortInfo,
                TitleFilterValue = pagingInfo.TitleFilterValue,
                CategoryFilterValue = pagingInfo.CategoryFilterValue,
            };

            var result = await _tutorshipService.GetTutorshipsAsync(dto);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            GetTutorshipsResponseDTO tutorships = (GetTutorshipsResponseDTO)result.Result;

            return Ok(tutorships);
        }

        /// <summary>
        /// Asynchronous method for loading all tutorships that were published by the user specified by an id
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        ///
        /// The number of the first page is 1. Both "PageNumber" and "PageSize" have to be greater or equal to 1.
        /// </remarks>
        /// <param name="userId">Id of the user</param>
        /// <param name="pagingInfo">Object containing information about paging</param>
        /// <returns>Object containing a list of tutorships along with information about paging, filtering and order</returns>
        /// <response code="200">Object containing a list of tutorships along with information about paging, filtering and order</response>
        /// <response code="500">Error message</response>
        [HttpPost]
        [Route("Tutorship/GetTutorshipsForUserAsync/{userId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(GetTutorshipsResponseDTO), 200)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetTutorshipsForUserAsync(int userId, GetTutorshipsForUserViewModel pagingInfo)
        {
            GetTutorshipsDTO dto = new GetTutorshipsDTO()
            {
                PageNumber = pagingInfo.PageNumber,
                PageSize = pagingInfo.PageSize,
                UserIdFilterValue = userId
            };

            var result = await _tutorshipService.GetTutorshipsAsync(dto);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            GetTutorshipsResponseDTO tutorships = (GetTutorshipsResponseDTO)result.Result;

            return Ok(tutorships);
        }

        /// <summary>
        /// Asynchronous method for publishing a tutorship announcement as the user that is currently logged in
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <param name="newTutorship">Object containing information about the tutorship</param>
        /// <returns>Object containing information about a new tutorship along with a route to the get method</returns>
        /// <response code="201">Object containing information about a new tutorship along with a route to the get method</response>
        /// <response code="500">Error message</response>
        [HttpPost]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [Route("Tutorship/AddTutorshipAsync")]
        [ProducesResponseType(typeof(ReadTutorshipDTO), 201)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> AddTutorshipAsync(NewTutorshipViewModel newTutorship)
        {
            int userId = GetUserId();

            CreateTutorshipDTO dto = new CreateTutorshipDTO()
            {
                Title = newTutorship.Title,
                Details = newTutorship.Details,
                Price = newTutorship.Price,
                Category = newTutorship.Category,
                CreatedById = userId
            };

            var result = await _tutorshipService.AddTutorshipAsync(dto);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            ReadTutorshipDTO tutorshipDTO = (ReadTutorshipDTO)result.Result;

            return CreatedAtRoute("GetTutorshipAsync", new { tutorshipId = tutorshipDTO.Id }, tutorshipDTO);
        }

        /// <summary>
        /// Asynchronous method for updating an existing tutorship
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <param name="tutorshipId">Id of the tutorship</param>
        /// <param name="updatedTutorship">Object containing new information about the tutorship</param>
        /// <returns>Nothing if the method executes correctly and an error message if it doesn't</returns>
        /// <response code="204"></response>
        /// <response code="403">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [HttpPut]
        [Route("Tutorship/UpdateTutorshipAsync/{tutorshipId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(void), 204)]
        [ProducesResponseType(typeof(string), 403)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> UpdateTutorshipAsync(int tutorshipId, UpdateTutorshipViewModel updatedTutorship)
        {
            int userId = GetUserId();

            var oldTutorshipResponse = await _tutorshipService.GetTutorshipAsync(tutorshipId);

            if (oldTutorshipResponse.IsSuccess == false)
            {
                return StatusCode(oldTutorshipResponse.StatusCode, oldTutorshipResponse.Message);
            }

            ReadTutorshipDTO oldTutorshipDTO = (ReadTutorshipDTO)oldTutorshipResponse.Result;

            if (userId != oldTutorshipDTO.Author.Id)
            {
                return StatusCode(403, "You can't modify the tutorship that you don't own");
            }

            UpdateTutorshipDTO dto = new UpdateTutorshipDTO()
            {
                Id = tutorshipId,
                Title = updatedTutorship.Title,
                Details = updatedTutorship.Details,
                Price = updatedTutorship.Price,
                Category = updatedTutorship.Category,
            };

            var result = await _tutorshipService.UpdateTutorshipAsync(dto);

            if (result.IsSuccess == false)
            {
                StatusCode(result.StatusCode, result.Message);
            }

            return StatusCode(204);
        }

        /// <summary>
        /// Asynchronous method for deleting the tutorship announcement
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <param name="tutorshipId">Id of the tutorship</param>
        /// <returns>Nothing if the method executes correctly and an error message if it doesn't</returns>
        /// <response code="204"></response>
        /// <response code="403">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [HttpDelete]
        [Route("Tutorship/DeleteTutorshipAsync/{tutorshipId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(void), 204)]
        [ProducesResponseType(typeof(string), 403)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> DeleteTutorshipAsync(int tutorshipId)
        {
            int userId = GetUserId();

            var oldTutorshipResponse = await _tutorshipService.GetTutorshipAsync(tutorshipId);

            if (oldTutorshipResponse.IsSuccess == false)
            {
                return StatusCode(oldTutorshipResponse.StatusCode, oldTutorshipResponse.Message);
            }

            ReadTutorshipDTO oldTutorshipDTO = (ReadTutorshipDTO)oldTutorshipResponse.Result;

            if (userId != oldTutorshipDTO.Author.Id)
            {
                return StatusCode(403, "You can't modify the tutorship that you don't own");
            }

            var result = await _tutorshipService.DeleteTutorshipAsync(tutorshipId);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            return StatusCode(204);
        }

        /// <summary>
        /// Method for loading all available tutorship categories
        /// </summary>
        /// <returns>A list of all available tutorship categories</returns>
        /// <response code="200">A list of all available tutorship categories</response>
        /// <response code="500">Error message</response>
        [HttpGet]
        [Route("Tutorship/GetCategories")]
        [ProducesResponseType(typeof(List<string>), 200)]
        [ProducesResponseType(typeof(string), 500)]
        public IActionResult GetCategories()
        {
            var result = _tutorshipService.GetCategories();

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            List<string> categories = (List<string>)result.Result;

            return Ok(categories);
        }

        #endregion Methods
    }
}