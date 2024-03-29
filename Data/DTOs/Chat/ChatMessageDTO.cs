﻿namespace Data.DTOs.Chat
{
    public class ChatMessageDTO
    {
        public string Id { get; set; }
        public string Message { get; set; }
        public string SenderId { get; set; }

        public string SenderName { get; set; }
        public bool UserIsSender { get; set; }
    }
}