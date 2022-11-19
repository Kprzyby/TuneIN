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
                UserName = newUser.UserName,
                Email = newUser.Email,
                Password = newUser.Password,
                UserRole = UserRole.UNCONFIRMED.ToString(),
                ConfirmationGUID = Guid.NewGuid()
            };

            var createResult = await _authService.AddUserAsync(userDTO);

            if (createResult == false)
            {
                return StatusCode(500, "Error while creating user!");
            }

            string confirmationURL = this.Url.Action("ConfirmAccount", "Auth", new { Email = newUser.Email, ConfirmationGUID = userDTO.ConfirmationGUID }, protocol: "https");

            bool sendEmailResult = await _authService.SendConfirmationEmail(newUser.Email, newUser.UserName, confirmationURL);

            if (sendEmailResult == false)
            {
                return BadRequest("Error while sending confirmation email!");
            }

            return StatusCode(201, "User created successfully!");
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("Auth/ConfirmAccount")]
        public async Task<IActionResult> ConfirmAccount(ConfirmUserViewModel confirmationData)
        {
            bool result = await _authService.ConfirmAccount(confirmationData.Email, confirmationData.ConfirmationGUID);

            if (result == false)
            {
                return BadRequest("Error while confirming the account!");
            }

            return Ok("Account confirmed successfully!");
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