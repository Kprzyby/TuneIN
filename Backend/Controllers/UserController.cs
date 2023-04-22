using Backend.ViewModels.User;
using Common.CustomDataAttributes;
using Data.DTOs.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace Backend.Controllers
{
    public class UserController : BaseController
    {
        #region Constructors

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        #endregion Constructors

        #region Properties

        private readonly UserService _userService;

        #endregion Properties

        #region Methods

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
        [Route("User/GetCurrentUserAsync")]
        [ProducesResponseType(typeof(ReadUserDTO), 200)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetCurrentUserAsync()
        {
            int userId = GetUserId();

            var result = await _userService.GetUserAsync(null, userId);

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
        [Route("User/GetUserAsync")]
        [ProducesResponseType(typeof(ReadUserDTO), 200)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetUserAsync(int userId)
        {
            var result = await _userService.GetUserAsync(null, userId);

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
        [Route("User/GetAllUsersAsync")]
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

            var response = await _userService.GetAllUsersAsync(dto);

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
        [Route("User/GetAllUsernames")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(List<string>), 200)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetAllUsernamesAsync()
        {
            var response = await _userService.GetAllUsernamesAsync();

            if (response.IsSuccess == false)
            {
                return StatusCode(response.StatusCode, response.Message);
            }

            List<string> usernames = (List<string>)response.Result;

            return Ok(usernames);
        }

        /// <summary>
        /// Asynchronous method for setting the avatarId for the user
        /// </summary>
        /// <remarks>
        /// To set the avatarId to the default one pass null as the avatarId
        /// </remarks>
        /// <param name="userId">Id of the user</param>
        /// <param name="avatarId">Id of the avatar</param>
        /// <returns>Nothing if the method executes correctly and an error message if it doesn't</returns>
        /// <response code="204"></response>
        /// <response code="400">Error message</response>
        /// <response code="403">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [HttpPatch]
        [Route("User/{userId}/UpdateAvatarIdAsync/{avatarId}")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(void), 204)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 403)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> UpdateAvatarIdAsync(int userId, int? avatarId)
        {
            int currentUserId = GetUserId();

            if (currentUserId != userId)
            {
                return StatusCode(403, "You can't change the avatar of another user");
            }

            UpdateAvatarDTO dto = new UpdateAvatarDTO()
            {
                UserId = userId,
                AvatarId = avatarId
            };

            var response = await _userService.UpdateAvatarAsync(dto);

            if (response.IsSuccess == false)
            {
                return StatusCode(response.StatusCode, response.Message);
            }

            return StatusCode(204);
        }

        /// <summary>
        /// Asynchronous method for updating the user's username
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <param name="usernameViewModel">Object containing user's new username</param>
        /// <returns>Nothing if the method executes correctly and an error message if it doesn't</returns>
        /// <response code="204"></response>
        /// <response code="400">Error message</response>
        /// <response code="403">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [HttpPatch]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [Route("User/{userId}/UpdateUsernameAsync")]
        [ProducesResponseType(typeof(void), 204)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 403)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> UpdateUsernameAsync(int userId, UpdateUsernameViewModel usernameViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Username was not provided or was already taken by another user");
            }

            int currentUserId = GetUserId();

            if (currentUserId != userId)
            {
                return StatusCode(403, "You can't change the username of another user");
            }

            UpdateUsernameDTO dto = new UpdateUsernameDTO()
            {
                UserId = userId,
                Username = usernameViewModel.Username
            };

            var response = await _userService.UpdateUsernameAsync(dto);

            if (response.IsSuccess == false)
            {
                return StatusCode(response.StatusCode, response.Message);
            }

            return StatusCode(204);
        }

        /// <summary>
        /// Asynchronous method for updating the user's email
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <param name="email">User's new email</param>
        /// <returns>Nothing if the method executes correctly and an error message if it doesn't</returns>
        /// <response code="204"></response>
        /// <response code="403">Error message</response>
        /// <response code="404">Error message</response>
        /// <response code="500">Error message</response>
        [HttpPatch]
        [Route("User/{userId}/UpdateEmailAsync")]
        [RequireRole("REGULAR_USER", "TUTOR")]
        [ProducesResponseType(typeof(void), 204)]
        [ProducesResponseType(typeof(string), 403)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> UpdateEmailAsync(int userId, string email)
        {
            int currentUserId = GetUserId();

            if (currentUserId != userId)
            {
                return StatusCode(403, "You can't change the email of another user");
            }

            UpdateEmailDTO dto = new UpdateEmailDTO()
            {
                UserId = userId,
                Email = email
            };

            var response = await _userService.UpdateEmailAsync(dto);

            if (response.IsSuccess == false)
            {
                return StatusCode(response.StatusCode, response.Message);
            }

            return StatusCode(204);
        }

        #endregion Methods
    }
}