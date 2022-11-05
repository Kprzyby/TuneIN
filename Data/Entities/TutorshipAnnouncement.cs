using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities
{
    [Table("TutorshipAnnouncement")]
    public class TutorshipAnnouncement
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }
        public string Details { get; set; }
        public decimal Price { get; set; }
        public DateTime CreationDate { get; set; }
        public string Category { get; set; }
        public int CreatedById { get; set; }

        [ForeignKey("CreatedById")]
        public virtual User CreatedBy { get; set; }
    }
}