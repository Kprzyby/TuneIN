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

        [HttpGet("Tutorship/GetTutorshipAsync/{tutorshipId}", Name = "GetTutorshipAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
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
        ///
        /// </summary>
        /// <remarks>
        /// The number of the first page is 1. Both "PageNumber" and "PageSize" have to be greater or equal to 1.
        ///
        /// The "SortInfo" parameter's key has to be "Price" and its value either "asc" or "desc" depending on the desired sort order.
        ///
        /// Nullable - "SortInfo", "TitleFilterValue", "CategoryFilterValue"
        /// </remarks>
        /// <param name="pagingInfo"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Tutorship/GetTutorshipsAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
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
        ///
        /// </summary>
        /// <remarks>
        /// The number of the first page is 1. Both "PageNumber" and "PageSize" have to be greater or equal to 1.
        /// </remarks>
        /// <param name="userId"></param>
        /// <param name="pagingInfo"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Tutorship/GetTutorshipsForUserAsync/{userId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
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

        [HttpPost]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [Route("Tutorship/AddTutorshipAsync")]
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

        [HttpPut]
        [Route("Tutorship/UpdateTutorshipAsync/{tutorshipId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
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

        [HttpDelete]
        [Route("Tutorship/DeleteTutorshipAsync/{tutorshipId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
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

        [HttpGet]
        [Route("Tutorship/GetCategories")]
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