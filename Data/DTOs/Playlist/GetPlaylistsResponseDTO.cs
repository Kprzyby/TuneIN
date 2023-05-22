using Data.DTOs.Library;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs.Playlist
{
    public class GetPlaylistsResponseDTO
    {
        public IEnumerable<PlaylistDTO>? Playlists { get; set; }
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public string? PlaylistNameFilterValue { get; set; }
    }
}
