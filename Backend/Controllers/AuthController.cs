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

        [HttpPut]
        [AllowAnonymous]
        [Route("Auth/ConfirmAccountAsync")]
        public async Task<IActionResult> ConfirmAccountAsync(string email, Guid confirmationGUID)
        {
            var result = await _authService.ConfirmAccountAsync(email, confirmationGUID);

            return StatusCode(result.StatusCode, result.Message);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Auth/RecoverPasswordAsync")]
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

        [HttpPut]
        [AllowAnonymous]
        [Route("Auth/ChangePasswordAsync")]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordViewModel newPassword)
        {
            var result = await _authService.ChangePasswordAsync(newPassword.Email, newPassword.Password, newPassword.PasswordRecoveryGUID);

            return StatusCode(result.StatusCode, result.Message);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Auth/SignInAsync")]
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

        [RequireRole("REGULAR_USER", "TUTOR")]
        [HttpGet]
        [Route("Auth/SignOutAsync")]
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

        [RequireRole("REGULAR_USER", "TUTOR")]
        [HttpGet]
        [Route("Auth/GetCurrentUserAsync")]
        public async Task<IActionResult> GetCurrentUserAsync()
        {
            int userId = GetUserId();

            var result = await _authService.GetUserAsync(null, userId);

            if (result.IsSuccess == false)
            {
                return StatusCode(500, "Error while loading the user from the database");
            }

            ReadUserDTO userDTO = (ReadUserDTO)result.Result;

            return Ok(userDTO);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("Auth/GetUserAsync")]
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

        #endregion Methods
    }
}