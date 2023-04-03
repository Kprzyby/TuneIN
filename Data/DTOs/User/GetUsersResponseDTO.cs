namespace Data.DTOs.User
{
    public class GetUsersResponseDTO
    {
        public IEnumerable<ReadUserDTO> Users { get; set; }
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }

        public List<KeyValuePair<string, string>>? SortInfo { get; set; }
        public string? UsernameFilterValue { get; set; }
        public string? EmailFilterValue { get; set; }
    }
}