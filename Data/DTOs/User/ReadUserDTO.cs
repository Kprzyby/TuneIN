namespace Data.DTOs.User
{
    public class ReadUserDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string UserRole { get; set; }
        public int? AvatarId { get; set; }
    }
}