using Backend.ViewModels.User;
using Data.DTOs.User;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Services;
using System.Security.Claims;

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

        #region Methods

        [HttpPost]
        [Route("Auth/SignUp")]
        public async Task<IActionResult> SignUp(SignUpViewModel newUser)
        {
            bool userExists = await _authService.CheckIfUserExists(newUser.Email);

            if (userExists == true)
            {
                return StatusCode(409, "This email is already taken");
            }

            NewUserDTO userDTO = new NewUserDTO()
            {
                Email = newUser.Email,
                Password = newUser.Password
            };

            var result = await _authService.AddUserAsync(userDTO);

            if (result == false)
            {
                return StatusCode(500, "Error while creating user!");
            }

            return StatusCode(201, "User created successfully!");
        }

        [HttpPost]
        [Route("Auth/SignIn")]
        public async Task<IActionResult> SignIn(SignInViewModel logInCredentials)
        {
            var authenticated = await _authService.ValidateUserAsync(logInCredentials.Email, logInCredentials.Password);

            if (authenticated == false)
            {
                return BadRequest("Wrong credentials!");
            }

            var claimsIdentity = new ClaimsIdentity(null, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

            return Ok("User signed in successfully!");
        }

        [HttpGet]
        [Route("Auth/SignOut")]
        public async Task<IActionResult> SignOut()
        {
            await HttpContext.SignOutAsync("Cookies");

            return Ok("User signed out successfully!");
        }

        #endregion Methods
    }
}