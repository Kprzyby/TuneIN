namespace Data.DTOs.Chat
{
    public class GetChatsDTO
    {
        public List<GetChatDTO> Chats { get; set; }
        public string ContinuationToken { get; set; }
    }
}