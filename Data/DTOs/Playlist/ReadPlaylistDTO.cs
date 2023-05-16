using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.DTOs.Library;
using Data.DTOs.User;

namespace Data.DTOs.Playlist
{
    public class ReadPlaylistDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ReadTutorshipAuthorDTO Author { get; set; }
        public List<ReadTrackInfoDTO>? trackInfos { get; set; }
    }
}
