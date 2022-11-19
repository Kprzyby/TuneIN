using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.User
{
    public class ConfirmUserViewModel
    {
        [Required(ErrorMessage = "This field is required!")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "This field is required!")]
        public Guid ConfirmationGUID { get; set; }
    }
}