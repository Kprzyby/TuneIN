using Data.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs.Library
{
    public class ReadTrackInfoDTO
    {
        public int Id { get; set; }

        public string TrackName { get; set; }
        public string Band { get; set; }
        public string Genre { get; set; }
        public string LinkToCover { get; set; }
        public string LinkToTabs { get; set; }
        public ReadTutorshipAuthorDTO Author { get; set; }
    }
}
