using Common.CustomDataAttributes;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace Backend.Controllers
{
    [ApiController]
    public class LibraryController : Controller
    {
        #region Properties

        private readonly FetchService _fetchService;

        #endregion Properties

        #region Constructors

        public LibraryController(FetchService fetchService)
        {
            _fetchService = fetchService;
        }

        #endregion Constructors

        #region Methods

        [RequireRole("REGULAR_USER", "TUTOR")]
        [HttpGet]
        [Route("Library/GetURL")]
        public async Task<IActionResult> GetURLAsync(string url)
        {
            Console.WriteLine("Dziaa");
            var link = await _fetchService.GetURL(url);
            return Ok(link);
        }

        #endregion Methods
    }
}