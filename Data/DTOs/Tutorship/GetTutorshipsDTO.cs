namespace Data.DTOs.Tutorship
{
    public class GetTutorshipsDTO
    {
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public KeyValuePair<string, string>? SortInfo { get; set; }
        public string? TitleFilterValue { get; set; }
        public string? CategoryFilterValue { get; set; }
        public int? UserIdFilterValue { get; set; }
    }
}