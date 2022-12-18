using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs.Chat
{
    public class GetMessagesDTO
    {
        public List<ChatMessageDTO> Messages { get; set; }
        public string ContinuationToken { get; set; }
    }
}