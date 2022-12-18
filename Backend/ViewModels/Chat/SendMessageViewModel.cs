using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.Chat
{
    public class SendMessageViewModel
    {
        [Required(ErrorMessage = "This field is required!")]
        public string ChatId { get; set; }

        [Required(ErrorMessage = "This field is required!")]
        public string Message { get; set; }
    }
}