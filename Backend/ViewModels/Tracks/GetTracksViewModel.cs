using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.Library
{
    public class GetTracksViewModel
    {
        [Required]
        [Min(1)]
        public int PageSize { get; set; }

        [Required]
        [Min(1)]
        public int PageNumber { get; set; }

        public string? TrackNameFilterValue { get; set; }
        public string? BandFilterValue { get; set; }
        public string? GenreFilterValue { get; set; }

    }
}
