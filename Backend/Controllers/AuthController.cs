using Backend.ViewModels.User;
using Common.CustomDataAttributes;
using Common.Enums;
using Data.DTOs.User;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using System.Security.Claims;
using System.Web;

namespace Backend.Controllers
{
    [ApiController]
    public class AuthController : BaseController
    {
        #region Properties

        private readonly AuthService _authService;
        private readonly ChatService _chatService;
        private readonly UserService _userService;

        #endregion Properties

        #region Constructors

        public AuthController(AuthService authService, ChatService chatService, UserService userService)
        {
            _authService = authService;
            _chatService = chatService;
            _userService = userService;
        }

        #endregion Constructors

        #region Methods

        private Uri CreatePasswordRecoveryURL(Guid passwordRecoveryGUID, string host, int userId)
        {
            var uriBuilder = new UriBuilder("http://" + host + ":3000" + "/api/recover/password");
            var parameters = HttpUtility.ParseQueryString(string.Empty);
            parameters["id"] = userId.ToString();
            parameters["passwordRecoveryGUID"] = passwordRecoveryGUID.ToString();
            uriBuilder.Query = parameters.ToString();

            Uri finalUrl = uriBuilder.Uri;

            return finalUrl;
        }

        private Uri CreateAccountConfirmationURL(string host, string email, Guid confirmationGUID)
        {
            var uriBuilder = new UriBuilder("http://" + host + ":3000" + "/api/activate/user");
            var parameters = HttpUtility.ParseQueryString(string.Empty);
            parameters["email"] = email;
            parameters["confirmationGUID"] = confirmationGUID.ToString();
            uriBuilder.Query = parameters.ToString();

            Uri finalUrl = uriBuilder.Uri;

            return finalUrl;
        }

        /// <summary>
        /// Asynchronous method for creating a user's account
        /// </summary>
        /// <param name="newUser">Object containing information about the new user</param>
        /// <returns>Error or success message</returns>
        /// <response code="201">Success message</response>
        /// <response code="409">Error message</response>
        /// <response code="500">Error message</response>
        /// <response code="502">Error message</response>
        [AllowAnonymous]
        [HttpPost]
        [Route("Auth/SignUpAsync")]
        [ProducesResponseType(typeof(string), 201)]
        [ProducesResponseType(typeof(string), 409)]
        [ProducesResponseType(typeof(string), 500)]
        [ProducesResponseType(typeof(string), 502)]
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

            if (createResult.IsSuccess == false)
            {
                return StatusCode(createResult.StatusCode, createResult.Message);
            }

            string host = Request.Host.Host;

            Uri url = CreateAccountConfirmationURL(host, userDTO.Email, userDTO.ConfirmationGUID);

            string confirmationURL = url.AbsoluteUri.ToString();

            var sendEmailResult = await _authService.SendConfirmationEmailAsync(newUser.Email, newUser.UserName, confirmationURL);

            if (sendEmailResult.IsSuccess == false)
            {
                return StatusCode(sendEmailResult.StatusCode, sendEmailResult.Message);
            }

            return StatusCode(createResult.StatusCode, createResult.Message);
        }

        /// <summary>
        /// Asynchronous method for confirming a user's account
        /// </summary>
        /// <param name="email">User's email</param>
        /// <param name="confirmationGUID">Identifier passed in the URL of the link in the confirmation email</param>
        /// <returns>Error or success message</returns>
        /// <response code="200">Success message</response>
        /// <response code="403">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [HttpPut]
        [AllowAnonymous]
        [Route("Auth/ConfirmAccountAsync")]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(typeof(string), 403)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> ConfirmAccountAsync(string email, Guid confirmationGUID)
        {
            var result = await _authService.ConfirmAccountAsync(email, confirmationGUID);

            return StatusCode(result.StatusCode, result.Message);
        }

        /// <summary>
        /// Asynchronous method for sending an email to the user with the purpose of recovering his password
        /// </summary>
        /// <param name="email">User's email</param>
        /// <returns>Error or success message</returns>
        /// <response code="200">Success message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [HttpGet]
        [AllowAnonymous]
        [Route("Auth/RecoverPasswordAsync")]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> RecoverPasswordAsync(string email)
        {
            string host = Request.Host.Host;
            Guid passwordRecoveryGUID = Guid.NewGuid();
            var getResult = await _userService.GetUserAsync(email, null);

            if (getResult.IsSuccess == false)
            {
                return StatusCode(getResult.StatusCode, getResult.Message);
            }

            ReadUserDTO userDTO = (ReadUserDTO)getResult.Result;

            Uri url = CreatePasswordRecoveryURL(passwordRecoveryGUID, host, userDTO.Id);

            string passwordRecoveryURL = url.AbsoluteUri.ToString();

            var emailResult = await _authService.SendPasswordRecoveryEmailAsync(email, passwordRecoveryURL, passwordRecoveryGUID);

            return StatusCode(emailResult.StatusCode, emailResult.Message);
        }

        /// <summary>
        /// Asynchronous method for changing the user's password after password recovery was requested
        /// </summary>
        /// <param name="newPassword">Object containing inofmration necessary to change the password</param>
        /// <returns>Error or success message</returns>
        /// <response code="200">Success message</response>
        /// <response code="403">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [HttpPut]
        [AllowAnonymous]
        [Route("Auth/ChangePasswordAsync")]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(typeof(string), 403)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordViewModel newPassword)
        {
            var result = await _authService.ChangePasswordAsync(newPassword.Email, newPassword.Password, newPassword.PasswordRecoveryGUID);

            return StatusCode(result.StatusCode, result.Message);
        }

        /// <summary>
        /// Asynchronous method for signing in to the app
        /// </summary>
        /// <param name="logInCredentials">Object containing authorization credentials</param>
        /// <returns>Object containing information about the user</returns>
        /// <response code="200">Object containing information about the user</response>
        /// <response code="401">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        /// <response code="502">Error message</response>
        [AllowAnonymous]
        [HttpPost]
        [Route("Auth/SignInAsync")]
        [ProducesResponseType(typeof(ReadUserDTO), 200)]
        [ProducesResponseType(typeof(string), 401)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        [ProducesResponseType(typeof(string), 502)]
        public async Task<IActionResult> SignInAsync(SignInViewModel logInCredentials)
        {
            var claimsResult = await _authService.ValidateUserAndCreateClaimsAsync(logInCredentials.Email, logInCredentials.Password);

            if (claimsResult.IsSuccess == false)
            {
                return StatusCode(claimsResult.StatusCode, claimsResult.Message);
            }

            var tokenResponse = await _chatService.GenerateChatAccessTokenAsync(logInCredentials.Email);

            if (tokenResponse.IsSuccess == false)
            {
                return StatusCode(tokenResponse.StatusCode, tokenResponse.Message);
            }

            ClaimsIdentity identity = (ClaimsIdentity)claimsResult.Result;
            string chatToken = (string)tokenResponse.Result;

            Response.Cookies.Append("ChatToken", chatToken);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

            var userResult = await _userService.GetUserAsync(logInCredentials.Email, null);

            if (userResult.IsSuccess == false)
            {
                return StatusCode(userResult.StatusCode, userResult.Message);
            }

            ReadUserDTO userDTO = (ReadUserDTO)userResult.Result;

            return Ok(userDTO);
        }

        /// <summary>
        /// Asynchronous method for logging out of the app
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <returns>Error or success message</returns>
        /// <response code="200">Success message</response>
        /// <response code="404">Error message</response>
        /// <response code="502">Error message</response>
        [RequireRole("REGULAR_USER", "TUTOR")]
        [HttpGet]
        [Route("Auth/SignOutAsync")]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 502)]
        public async Task<IActionResult> SignOutAsync()
        {
            await HttpContext.SignOutAsync("Cookies");

            int userId = GetUserId();

            Response.Cookies.Append("ChatToken", "");
            var tokensResult = await _chatService.RemoveAllTokensAsync(userId);

            if (tokensResult.IsSuccess == false)
            {
                return StatusCode(tokensResult.StatusCode, tokensResult.Message);
            }

            return Ok("User signed out successfully!");
        }

        #endregion Methods
    }
}