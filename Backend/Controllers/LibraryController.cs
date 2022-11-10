using Microsoft.AspNetCore.Mvc;
using Services;
using System.Net;

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
        [HttpGet]
        [Route("Library/GetURL")]
        public IActionResult GetURL(string url)
        {
            var link = _fetchService.GetURL(url);
            return Ok(link); 
        }

        #endregion Methods
    }
}
