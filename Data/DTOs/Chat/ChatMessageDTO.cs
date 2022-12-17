using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs.Chat
{
    public class ChatMessageDTO
    {
        public string Id { get; set; }
        public string Message { get; set; }
        public string CreatorId { get; set; }
    }
}