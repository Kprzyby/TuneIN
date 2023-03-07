using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.Tutorship
{
    public class GetTutorshipsViewModel
    {
        [Required]
        [Min(1)]
        public int PageSize { get; set; }

        [Required]
        [Min(1)]
        public int PageNumber { get; set; }

        public KeyValuePair<string, string>? SortInfo { get; set; }
        public string? TitleFilterValue { get; set; }
        public string? CategoryFilterValue { get; set; }
    }
}