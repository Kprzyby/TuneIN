using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.Tutorship
{
    public class GetTutorshipsForUserViewModel
    {
        [Required]
        [Min(1)]
        public int PageSize { get; set; }

        [Required]
        [Min(1)]
        public int PageNumber { get; set; }
    }
}