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
    public class AuthController : BaseController
    {
        #region Properties

        private readonly AuthService _authService;
        private readonly ChatService _chatService;

        #endregion Properties

        #region Constructors

        public AuthController(AuthService authService, ChatService chatService)
        {
            _authService = authService;
            _chatService = chatService;
        }

        #endregion Constructors

        #region Methods

        /// <summary> Creates a new account </summary>
        /// <param name="newUser">Object of the SignUpViewModel containing information about the user</param>
        /// <returns>IActionResult</returns>
        /// <remarks>
        /// <h2>Example request</h2>
        ///
        ///     {
        ///       "UserName": "Gosia123",
        ///       "Email": "Gkowalska1@wp.pl",
        ///       "Password": "GoodPassword12#",
        ///       "RepeatPassword": "GoodPassword12#"
        ///     }
        ///
        /// </remarks>
        /// <response code="201">string "User created successfully!" </response>
        /// <response code="400">string "Error while sending confirmation email!"</response>
        /// <response code="409">string "This email is already taken"</response>
        /// <response code="500">string "Error while creating user!"</response>
        [AllowAnonymous]
        [HttpPost]
        [Route("Auth/SignUpAsync")]
        [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status409Conflict)]
        [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
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

        /// <summary> Logs in to the user's account </summary>
        /// <param name="logInCredentials">Object of the SignInViewModel class containing credentials</param>
        /// <returns>IActionResult</returns>
        /// <remarks>
        /// <h2>Example request</h2>
        ///
        ///     {
        ///       "Email": "Gkowalska1@wp.pl",
        ///       "Password": "GoodPassword12#"
        ///     }
        ///
        /// </remarks>
        /// <response code="200">string "User signed in successfully!" </response>
        /// <response code="400">string "Wrong credentials!"</response>
        [AllowAnonymous]
        [HttpPost]
        [Route("Auth/SignInAsync")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SignInAsync(SignInViewModel logInCredentials)
        {
            var claimsIdentity = await _authService.ValidateUserAndCreateClaimsAsync(logInCredentials.Email, logInCredentials.Password);

            if (claimsIdentity == null)
            {
                return BadRequest("Wrong credentials!");
            }

            var token = await _chatService.GenerateChatAccessTokenAsync(logInCredentials.Email);

            Response.Cookies.Append("ChatToken", token);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

            return Ok("User signed in successfully!");
        }

        /// <summary> Logs the user out </summary>
        /// <returns>IActionResult</returns>
        /// <response code="200">string "User signed out successfully!" </response>
        /// <response code="502">string "Error while logging out!"</response>
        [AllowAnonymous]
        [HttpGet]
        [Route("Auth/SignOutAsync")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status502BadGateway)]
        public async Task<IActionResult> SignOutAsync()
        {
            await HttpContext.SignOutAsync("Cookies");

            int userId = GetUserId();

            Response.Cookies.Append("ChatToken", "");
            var success = await _chatService.RemoveAllTokensAsync(userId);

            if (success == false)
            {
                return StatusCode(502, "Error while logging out!");
            }

            return Ok("User signed out successfully!");
        }

        #endregion Methods
    }
}