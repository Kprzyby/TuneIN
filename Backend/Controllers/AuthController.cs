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
        [Route("Auth/SignUpAsync")]
        public async Task<IActionResult> SignUpAsync(SignUpViewModel newUser)
        {
            bool userExists = await _authService.CheckIfUserExistsAsync(newUser.Email);

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

            string confirmationURL = this.Url.Action("ConfirmAccountAsync", "Auth", new { Email = newUser.Email, ConfirmationGUID = userDTO.ConfirmationGUID }, protocol: "https");

            bool sendEmailResult = await _authService.SendConfirmationEmailAsync(newUser.Email, newUser.UserName, confirmationURL);

            if (sendEmailResult == false)
            {
                return BadRequest("Error while sending confirmation email!");
            }

            return StatusCode(201, "User created successfully!");
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("Auth/ConfirmAccountAsync")]
        public async Task<IActionResult> ConfirmAccountAsync(ConfirmUserViewModel confirmationData)
        {
            bool result = await _authService.ConfirmAccountAsync(confirmationData.Email, confirmationData.ConfirmationGUID);

            if (result == false)
            {
                return BadRequest("Error while confirming the account!");
            }

            return Ok("Account confirmed successfully!");
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Auth/RecoverPasswordAsync")]
        public async Task<IActionResult> RecoverPasswordAsync(string email)
        {
            Guid passwordRecoveryGUID = Guid.NewGuid();

            string passwordRecoveryURL = this.Url.Action("ChangePasswordAsync", "Auth", new { email = email, passwordRecoveryGUID = passwordRecoveryGUID }, protocol: "https");

            bool result = await _authService.SendPasswordRecoveryEmailAsync(email, passwordRecoveryURL, passwordRecoveryGUID);

            if (result == false)
            {
                return StatusCode(404, "There is no user with such an email!");
            }

            return Ok("Password recovery email has been successfully sent!");
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("Auth/ChangePasswordAsync")]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordViewModel newPassword)
        {
            bool result = await _authService.ChangePasswordAsync(newPassword.Email, newPassword.Password, newPassword.PasswordRecoveryGUID);

            if (result == false)
            {
                return BadRequest("Error while changing password!");
            }

            return Ok("Password changed succesfully!");
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Auth/SignInAsync")]
        public async Task<IActionResult> SignInAsync(SignInViewModel logInCredentials)
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
        [Route("Auth/SignOutAsync")]
        public async Task<IActionResult> SignOutAsync()
        {
            await HttpContext.SignOutAsync("Cookies");

            return Ok("User signed out successfully!");
        }

        #endregion Methods
    }
}