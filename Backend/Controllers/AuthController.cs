using Backend.ViewModels.User;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace Backend.Controllers
{
    [ApiController]
    public class AuthController : Controller
    {
        #region Properties

        private readonly AuthService _authService;

        #endregion Properties

        #region Constructors

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        #endregion Constructors

        [HttpPost]
        [Route("Auth/SignUp")]
        public async Task<IActionResult> SignUp(SignUpViewModel newUser)
        {
            bool userExists = _authService.CheckIfUserExists(newUser.Email);

            return Ok("sda");
        }
    }
}