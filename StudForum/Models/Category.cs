using System.ComponentModel.DataAnnotations;

namespace StudForum.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public List<Subcategory> Subcategories { get; set; } = new List<Subcategory>();
        public List<Discussion> Discussions { get; set; } = new List<Discussion>();

        public Category()
        {

        }

        public Category(string name)
        {
            Name = name;
        }
    }
}
