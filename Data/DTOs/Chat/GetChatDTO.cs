using Azure.Communication.Chat;

namespace Data.DTOs.Chat
{
    public class GetChatDTO
    {
        public string Id { get; set; }
        public string Topic { get; set; }
        public List<ChatParticipant> Participants { get; set; }
        public IReadOnlyList<ChatMessageDTO> Messages { get; set; }
        public string ContinuationToken { get; set; }
    }
}