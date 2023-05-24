namespace Data.DTOs.Chat
{
    public class ChatParticipantDTO
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public int? AvatarId { get; set; }
    }
}