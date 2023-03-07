using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.Tutorship
{
    public class NewTutorshipViewModel
    {
        [Required]
        public string Title { get; set; }

        public string Details { get; set; }

        [Required]
        [Min(0)]
        public decimal Price { get; set; }

        [Required]
        public string Category { get; set; }
    }
}