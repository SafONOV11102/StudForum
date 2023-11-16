using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace StudForum.Dtos.Discussion
{
    public class CreateDto
    {
        [Required]
        [FromForm]
        [StringLength(100, MinimumLength = 2)]
        public string Title { get; set; }

        [Required]
        [FromForm]
        [StringLength(1000, MinimumLength = 20)]
        public string Text { get; set; }

        [FromForm]
        [Required]
        public int SubcategoryId { get; set; }

        [FromForm]
        public string Hashtags { get; set; }

        [Required]
        [FromForm]
        public int UserId { get; set; }
        [Required]
        [FromForm]
        public IFormFile Poster { get; set; }
    }
}
