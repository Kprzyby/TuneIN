using Common.CustomDataAttributes;
using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.User
{
    public class UpdateUsernameViewModel
    {
        [Required(ErrorMessage = "This field is required!")]
        [UsernameUnique]
        public string Username { get; set; }
    }
}