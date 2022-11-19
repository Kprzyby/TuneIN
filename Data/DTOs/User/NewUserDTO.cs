namespace Data.DTOs.User
{
    public class NewUserDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserRole { get; set; }
        public Guid ConfirmationGUID { get; set; }
    }
}