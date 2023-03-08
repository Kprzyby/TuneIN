namespace Data.DTOs.Tutorship
{
    public class GetTutorshipsResponseDTO
    {
        public IEnumerable<ReadTutorshipDTO> Tutorships { get; set; }
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }

        public KeyValuePair<string, string>? SortInfo { get; set; }
        public string? TitleFilterValue { get; set; }
        public string? CategoryFilterValue { get; set; }
    }
}