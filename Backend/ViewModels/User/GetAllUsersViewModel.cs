using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.User
{
    public class GetAllUsersViewModel
    {
        [Required]
        [Min(1)]
        public int PageSize { get; set; }

        [Required]
        [Min(1)]
        public int PageNumber { get; set; }

        public List<KeyValuePair<string, string>>? SortInfo { get; set; }
        public string? UsernameFilterValue { get; set; }
        public string? EmailFilterValue { get; set; }
    }
}