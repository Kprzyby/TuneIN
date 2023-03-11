using Data.DTOs.User;

namespace Data.DTOs.Tutorship
{
    public class ReadTutorshipDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Details { get; set; }

        public decimal Price { get; set; }

        public string Category { get; set; }

        public ReadTutorshipAuthorDTO Author { get; set; }
    }
}