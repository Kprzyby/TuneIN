using Data.DTOs.User;

namespace Data.DTOs.Playlist
{
    public class GetPlaylistDataDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? TrackAmount { get; set; }
        public ReadUserDTO Author { get; set; }
    }
}