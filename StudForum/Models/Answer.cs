using System.ComponentModel.DataAnnotations;

namespace StudForum.Models
{
    public class Answer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int DiscussionId { get; set; }
        public Discussion Discussion { get; set; }

        [Required]
        [StringLength(1000)]
        public string Content { get; set; }

        [Required]
        public int CreatedUserId { get; set; }
        public User CreatedUser { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedDate { get; set; }

        public Answer() => CreatedDate = DateTime.Now;

        public Answer(Discussion discussion, string content, User createdUser) : this()
        {
            Discussion = discussion;
            Content = content;
            CreatedUser = createdUser;
        }
    }
}
