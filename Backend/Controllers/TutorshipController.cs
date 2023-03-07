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

            if (result == null)
            {
                return NotFound("There is no tutorship with that id");
            }

            return Ok(result);
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

            if (result == null)
            {
                return StatusCode(500, "Error while creating the tutorship");
            }

            return CreatedAtRoute("GetTutorshipAsync", new { tutorshipId = result.Id }, result);
        }

        [HttpPut]
        [Route("Tutorship/UpdateTutorshipAsync/{tutorshipId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        public async Task<IActionResult> UpdateTutorshipAsync(int tutorshipId, UpdateTutorshipViewModel updatedTutorship)
        {
            int userId = GetUserId();

            ReadTutorshipDTO oldTutorship = await _tutorshipService.GetTutorshipAsync(tutorshipId);

            if (oldTutorship == null)
            {
                return NotFound("There is no tutorship with that id");
            }

            if (userId != oldTutorship.Author.Id)
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

            if (result == false)
            {
                StatusCode(500, "Error while updating the tutorship");
            }

            return StatusCode(204);
        }

        #endregion Methods
    }
}