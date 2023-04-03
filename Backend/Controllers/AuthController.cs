﻿using Backend.ViewModels.User;
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

        #endregion Properties

        #region Constructors

        public AuthController(AuthService authService, ChatService chatService)
        {
            _authService = authService;
            _chatService = chatService;
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
            var getResult = await _authService.GetUserAsync(email, null);

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

            var userResult = await _authService.GetUserAsync(logInCredentials.Email, null);

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

        /// <summary>
        /// Asynchronous method for loading information about the currently logged in user
        /// </summary>
        /// <remarks>
        /// Only a user that is currently logged in and has a confirmed account can access this method
        /// </remarks>
        /// <returns>Object containing information about the user that is currently logged in</returns>
        /// <response code="200">Object containing information about the user that is currently logged in</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [RequireRole("REGULAR_USER", "TUTOR")]
        [HttpGet]
        [Route("Auth/GetCurrentUserAsync")]
        [ProducesResponseType(typeof(ReadUserDTO), 200)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetCurrentUserAsync()
        {
            int userId = GetUserId();

            var result = await _authService.GetUserAsync(null, userId);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            ReadUserDTO userDTO = (ReadUserDTO)result.Result;

            return Ok(userDTO);
        }

        /// <summary>
        /// Asynchronous method for loading information about the user that is specified by an id
        /// </summary>
        /// <param name="userId">User's id</param>
        /// <returns>Object containing information about the user</returns>
        /// <response code="200">Object containing information about the user</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [AllowAnonymous]
        [HttpGet]
        [Route("Auth/GetUserAsync")]
        [ProducesResponseType(typeof(ReadUserDTO), 200)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetUserAsync(int userId)
        {
            var result = await _authService.GetUserAsync(null, userId);

            if (result.IsSuccess == false)
            {
                return StatusCode(result.StatusCode, result.Message);
            }

            ReadUserDTO userDTO = (ReadUserDTO)result.Result;

            return Ok(userDTO);
        }

        /// <summary>
        /// Asynchronous method for loading information about all users
        /// </summary>
        /// <remarks>
        /// The number of the first page is 1. Both "PageNumber" and "PageSize" have to be greater or equal to 1.
        ///
        /// The "SortInfo" parameter's keys can be "Email" or "UserName" and its value either "asc" or "desc" depending on the desired sort order.
        /// If this parameter is not provided, the users will be sorted by username ascendingly.
        ///
        /// The email filter will return users whose email starts with the given value (not case sensitive).
        /// The username filter will return users whose username starts with the given value  (not case sensitive).
        /// </remarks>
        /// <param name="getInfo">Object containing information about paging, filtering and order</param>
        /// <returns>Object containing a list of users along with information about paging, filtering and order</returns>
        /// <response code="200">Object containing a list of users along with information about paging, filtering and order</response>
        /// <response code="500">Error message</response>
        [AllowAnonymous]
        [HttpPost]
        [Route("Auth/GetAllUsersAsync")]
        [ProducesResponseType(typeof(GetUsersResponseDTO), 200)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetAllUsersAsync(GetAllUsersViewModel getInfo)
        {
            GetAllUsersDTO dto = new GetAllUsersDTO()
            {
                PageSize = getInfo.PageSize,
                PageNumber = getInfo.PageNumber,
                SortInfo = getInfo.SortInfo,
                UsernameFilterValue = getInfo.UsernameFilterValue,
                EmailFilterValue = getInfo.EmailFilterValue
            };

            var response = await _authService.GetAllUsersAsync(dto);

            if (response.IsSuccess == false)
            {
                return StatusCode(response.StatusCode, response.Message);
            }

            GetUsersResponseDTO result = (GetUsersResponseDTO)response.Result;

            return Ok(result);
        }

        /// <summary>
        /// Asynchronous method for loading all user's usernames
        /// </summary>
        /// <returns>All usernames that are currently used</returns>
        /// <response code="200">All usernames that are currently used</response>
        /// <response code="500">Error message</response>
        [HttpGet]
        [Route("Auth/GetAllUsernames")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(List<string>), 200)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetAllUsernamesAsync()
        {
            var response = await _authService.GetAllUsernamesAsync();

            if (response.IsSuccess == false)
            {
                return StatusCode(response.StatusCode, response.Message);
            }

            List<string> usernames = (List<string>)response.Result;

            return Ok(usernames);
        }

        #endregion Methods
    }
}