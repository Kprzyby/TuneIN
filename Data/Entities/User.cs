using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities
{
    [Table("User")]
    public class User
    {
        [Key]
        public int Id { get; set; }

        public byte[] Salt { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
        public string UserRole { get; set; }
    }
}