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

        #endregion Methods
    }
}