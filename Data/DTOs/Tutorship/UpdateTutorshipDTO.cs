namespace Data.DTOs.Tutorship
{
    public class UpdateTutorshipDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string Details { get; set; }

        public decimal Price { get; set; }

        public string Category { get; set; }
        public byte[] Image { get; set; }
    }
}