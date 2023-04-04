using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs.Library
{
    public class UpdateTrackDTO
    {
        public int Id { get; set; }
        public string? TrackName { get; set; }
        public string? Band { get; set; }
        public string? Genre { get; set; }
    }
}
