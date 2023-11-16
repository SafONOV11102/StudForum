using System.ComponentModel.DataAnnotations;

namespace StudForum.Dtos.User
{
    public class UpdateProfileDto
    {
        [StringLength(100, MinimumLength = 2)]
        public string Value { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Type { get; set; }
    }
}
