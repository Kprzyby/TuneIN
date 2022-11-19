using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.User
{
    public class SignUpViewModel
    {
        [Required(ErrorMessage = "This field is required!")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "This field is required!")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "This field is required!")]
        [DataType(DataType.Password)]
        [Compare("RepeatPassword", ErrorMessage = "Passwords have to be exactly the same!")]
        public string Password { get; set; }

        [Required(ErrorMessage = "This field is required!")]
        [DataType(DataType.Password)]
        public string RepeatPassword { get; set; }
    }
}