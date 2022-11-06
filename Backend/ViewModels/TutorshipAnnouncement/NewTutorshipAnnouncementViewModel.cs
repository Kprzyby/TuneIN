using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.TutorshipAnnouncement
{
    public class NewTutorshipAnnouncementViewModel
    {
        [Required(ErrorMessage = "This field is required")]
        public string Title { get; set; }

        public string Details { get; set; }

        [Required(ErrorMessage = "This field is required")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "This field is required")]
        public string Category { get; set; }
    }
}