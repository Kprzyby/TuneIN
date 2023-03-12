using Backend.ViewModels.User;
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

            string host = Request.Host.Host;

            var uriBuilder = new UriBuilder("http://" + host + ":3000" + "/api/activate/user");
            var parameters = HttpUtility.ParseQueryString(string.Empty);
            parameters["email"] = newUser.Email;
            parameters["confirmationGUID"] = userDTO.ConfirmationGUID.ToString();
            uriBuilder.Query = parameters.ToString();

            Uri finalUrl = uriBuilder.Uri;

            string confirmationURL = finalUrl.AbsoluteUri.ToString();

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
        public async Task<IActionResult> ConfirmAccountAsync(string email, Guid confirmationGUID)
        {
            bool result = await _authService.ConfirmAccountAsync(email, confirmationGUID);

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

            string host = Request.Host.Host;
            string scheme = Request.Scheme;

            var uriBuilder = new UriBuilder("http://" + host + ":3000" + "/api/recover/password");
            var parameters = HttpUtility.ParseQueryString(string.Empty);
            parameters["email"] = email;
            parameters["passwordRecoveryGUID"] = passwordRecoveryGUID.ToString();
            uriBuilder.Query = parameters.ToString();

            Uri finalUrl = uriBuilder.Uri;

            string passwordRecoveryURL = finalUrl.AbsoluteUri.ToString();

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

            var token = await _chatService.GenerateChatAccessTokenAsync(logInCredentials.Email);

            Response.Cookies.Append("ChatToken", token);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

            var userDTO = await _authService.GetUserAsync(logInCredentials.Email, null);

            if (userDTO == null)
            {
                return StatusCode(500, "Error while loading user from the database");
            }

            return Ok(userDTO);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("Auth/SignOutAsync")]
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