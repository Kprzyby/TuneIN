using Backend.ViewModels.User;
using Common.Enums;
using Data.DTOs.User;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
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

        [AllowAnonymous]
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
                Password = newUser.Password,
                UserRole = UserRole.UNCONFIRMED.ToString()
            };

            var result = await _authService.AddUserAsync(userDTO);

            if (result == false)
            {
                return StatusCode(500, "Error while creating user!");
            }

            return StatusCode(201, "User created successfully!");
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Auth/SignIn")]
        public async Task<IActionResult> SignIn(SignInViewModel logInCredentials)
        {
            var claimsIdentity = await _authService.ValidateUserAndCreateClaimsAsync(logInCredentials.Email, logInCredentials.Password);

            if (claimsIdentity == null)
            {
                return BadRequest("Wrong credentials!");
            }

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

            return Ok("User signed in successfully!");
        }

        [AllowAnonymous]
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