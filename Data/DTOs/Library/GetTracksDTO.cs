using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs.Library
{
    public class GetTracksDTO
    {
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public string? TrackNameFilterValue { get; set; }
        public string? BandFilterValue { get; set; }
        public string? GenreFilterValue { get; set; }

        public int? UserIdFilterValue { get; set; }
    }
}
