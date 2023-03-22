namespace Data.DTOs.Tutorship
{
    public class CreateTutorshipDTO
    {
        public string Title { get; set; }

        public string Details { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public int CreatedById { get; set; }
    }
}