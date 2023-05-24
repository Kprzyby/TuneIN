using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs.Playlist
{
    public class GetPlaylistFilteredDTO
    {
        public string? TrackNameFilterValue { get; set; }
        public KeyValuePair<string, string>? SortInfo { get; set; }
        public int? UserIdFilterValue { get; set; }
    }
}
