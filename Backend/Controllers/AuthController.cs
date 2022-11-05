using Backend.ViewModels.User;
using Data.DTOs.User;
using Microsoft.AspNetCore.Mvc;
using Services;

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

        #endregion Methods
    }
}