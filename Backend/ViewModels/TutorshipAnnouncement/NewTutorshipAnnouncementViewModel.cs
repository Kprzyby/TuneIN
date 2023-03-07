using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.TutorshipAnnouncement
{
    public class NewTutorshipAnnouncementViewModel
    {
        [Required]
        public string Title { get; set; }

        public string Details { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public string Category { get; set; }
    }
}