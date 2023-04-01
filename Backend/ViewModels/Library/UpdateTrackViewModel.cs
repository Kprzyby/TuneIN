namespace Backend.ViewModels.Library
{
    public class UpdateTrackViewModel
    {
        public string? TrackName { get; set; }
        public string? Band { get; set; }
        public string? Genre { get; set; }
        public string? LinkToCover { get; set; }
        public List<string>? LinkToTabs { get; set; }
        public byte[]? Files { get; set; }
    }
}
