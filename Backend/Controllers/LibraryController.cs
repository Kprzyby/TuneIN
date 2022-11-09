using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class LibraryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
