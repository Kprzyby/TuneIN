using Data.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs.Playlist
{
    public class GetPlaylistDataDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? TrackAmount { get; set; }
        public ReadTutorshipAuthorDTO Author { get; set; }
    }
}
