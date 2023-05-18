using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities
{
    [Table("PlaylistTracks")]
    public class PlaylistTracks
    {
        [Key]
        public int TrackInfoId { get; set; }
        [Key]
        public int PlaylistId { get; set; }

        [ForeignKey("TrackInfoId")]
        public virtual TrackInfo TrackInfo { get; set; }

        [ForeignKey("PlaylistId")]
        public virtual Playlist Playlist { get; set; }
    }
}
