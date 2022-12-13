using Data.CustomDataAttributes;
using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.Chat
{
    public class CreateChatViewModel
    {
        [Required(ErrorMessage = "This field is required!")]
        public string? Topic { get; set; }

        [Required(ErrorMessage = "This field is required!")]
        [ListNotEmpty]
        public List<int> ParticipantsIds { get; set; }
    }
}