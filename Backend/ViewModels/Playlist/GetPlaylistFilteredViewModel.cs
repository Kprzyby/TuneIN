using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.Playlist
{
    public class GetPlaylistFilteredViewModel
    {
        public string? TrackNameFilterValue { get; set; }
        public KeyValuePair<string, string>? SortInfo { get; set; }
    }
}
