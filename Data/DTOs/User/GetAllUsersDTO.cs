namespace Data.DTOs.User
{
    public class GetAllUsersDTO
    {
        public int PageSize { get; set; }

        public int PageNumber { get; set; }

        public List<KeyValuePair<string, string>>? SortInfo { get; set; }
        public string? UsernameFilterValue { get; set; }
        public string? EmailFilterValue { get; set; }
    }
}