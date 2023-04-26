using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities
{
    [Table("Tutorship")]
    public class Tutorship
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Details { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }

        public DateTime? UpdatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }

        [Required]
        public string Category { get; set; }

        public byte[] Image { get; set; }
        public string? ImageFormat { get; set; }

        [Required]
        public int CreatedById { get; set; }

        [ForeignKey("CreatedById")]
        public virtual User CreatedBy { get; set; }
    }
}