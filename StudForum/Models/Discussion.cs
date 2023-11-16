using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace StudForum.Models
{
    public class Discussion
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(70)]
        public string Title { get; set; }

        [Required]
        [StringLength(1000)]
        public string Content { get; set; }

        [Required]
        public int CreatedUserId { get; set; }

        public User CreatedUser { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public Category Category { get; set; }  

        [Required]
        public int SubcategoryId { get; set; }
        public Subcategory Subcategory { get; set; }

        [AllowNull]
        [StringLength(500)]
        public string HashTags { get; set; }

        [Required]
        public int Views { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedDate { get; set; }

        [Required]
        [StringLength(300)]
        public string PosterUrl { get; set; }

        public List<Answer> Answers { get; set; } = new List<Answer>();

        public Discussion()
        {
            CreatedDate = DateTime.Now;
            Views = 0;
        }

        public Discussion(string title, string content, User createdUser, Category category, Subcategory subcategory, string poster, string hashTags = "") : this()
        {
            Title = title;
            Content = content;
            CreatedUser = createdUser;
            Category = category;
            Subcategory = subcategory;
            HashTags = hashTags;
            PosterUrl = poster;
        }
    }
}
