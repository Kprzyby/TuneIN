using Common.CustomDataAttributes;
using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.Tutorship
{
    public class UpdateTutorshipViewModel
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Details { get; set; }

        [Required]
        [Min(0)]
        public decimal Price { get; set; }

        [Required]
        public string Category { get; set; }

        [AcceptImageFormat("image/png", "image/jpg", "image/jpeg")]
        public IFormFile? Image { get; set; }
    }
}