using Data.DTOs.Library;
using Data.DTOs.Tutorship;
using Data.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs.Playlist
{
    public class GetPlaylistResponseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ReadTrackInfoDTO>? TrackInfos { get; set; }
        public int TotalCount { get; set; }

        public KeyValuePair<string, string>? SortInfo { get; set; }
        public string? TrackNameFilterValue { get; set; }
        public ReadTutorshipAuthorDTO Author { get; set; }
    }
}
