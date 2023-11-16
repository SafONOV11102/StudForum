using System.ComponentModel.DataAnnotations;

namespace StudForum.Dtos.Discussion
{
    public class AddAnswerDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int DiscussionId { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 2)]
        public string Content { get; set; } = "";
    }
}
