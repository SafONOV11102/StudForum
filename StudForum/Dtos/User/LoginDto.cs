using System.ComponentModel.DataAnnotations;

namespace StudForum.Dtos.User
{
    public class LoginDto
    {
        [Required]
        [MaxLength(100, ErrorMessage = "Максимальная длина логина : 100")]
        [MinLength(3, ErrorMessage = "Минимальная длина логина : 3")]
        public string Login { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Максимальная длина пароля : 100")]
        [MinLength(7, ErrorMessage = "Минимальная длина пароля : 7")]
        public string Password { get; set; }
    }
}
