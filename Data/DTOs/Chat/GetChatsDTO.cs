using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs.Chat
{
    public class GetChatsDTO
    {
        public List<GetChatDTO> Chats { get; set; }
        public string ContinuationToken { get; set; }
    }
}