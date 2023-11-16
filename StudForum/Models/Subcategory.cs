using System.ComponentModel.DataAnnotations;

namespace StudForum.Models
{
    public class Subcategory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public Category Category { get; set; }

        public List<Discussion> Discussions { get; set; } = new List<Discussion>();

        public Subcategory() { }

        public Subcategory(string name, Category category)
        {
            Name = name;
            Category = category;
        }
    }
}
