using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudForum.Models
{
    [Index(nameof(Login), IsUnique = true)]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Login { get; set; }

        [Required]
        [StringLength(300)]
        public string PasswordHash { get; set; }

        [Required]
        public Profile Profile { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedDate { get; set; }

        public List<Discussion> Discussions { get; set; } = new List<Discussion>();
        public List<Answer> Answers { get; set; } = new List<Answer>();

        public User ()
        {
            CreatedDate = DateTime.Now;
        }

        public User(string login, string passwordHash, Profile profile) : this()
        {
            Login = login;
            PasswordHash = passwordHash;
            Profile = profile;
        }

        public bool CheckPassword(string password) => !BCrypt.Net.BCrypt.Verify(password, this.PasswordHash);
    }
}
