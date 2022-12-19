namespace Data.DTOs.Chat
{
    public class GetMessagesDTO
    {
        public List<ChatMessageDTO> Messages { get; set; }
        public string ContinuationToken { get; set; }
    }
}