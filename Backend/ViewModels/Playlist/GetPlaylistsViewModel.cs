using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.Playlist
{
    public class GetPlaylistsViewModel
    {
        [Required]
        [Min(1)]
        public int PageSize { get; set; }

        [Required]
        [Min(1)]
        public int PageNumber { get; set; }

        public string? PlaylistNameFilterValue { get; set; }
    }
}
