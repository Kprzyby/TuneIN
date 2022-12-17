using Azure.Communication.Chat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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