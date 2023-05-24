using Data.DTOs.Library;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs.Playlist
{
    public class PlaylistDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public IEnumerable<ReadTrackInfoDTO>? trackInfos { get; set; }

    }
}
