using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace StudForum.Models
{

    public class Profile
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        
        [Required]

        public User User { get; set; }

        [Required]
        [StringLength(70)]
        public string Name { get; set; }

        [Required]
        [StringLength(70)]
        public string Surname { get; set; }

        [Required]
        [StringLength(300)]
        public string AvatarUrl { get; set; }

        [AllowNull]
        [StringLength(50)]
        public string City { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }

        [AllowNull]
        [StringLength(150)]
        public string Email { get; set; }

        [StringLength(500)]
        public string PlaceOfStudy { get; set; }

        public Profile()
        {
            AvatarUrl = "/images/default_avatar.jpg";
        }

        public Profile(string name, string surname, string city, DateTime birthDate, string placeOfStudy, string email = "") : this()
        {
            Name = name;
            Surname = surname;
            City = city;
            BirthDate = birthDate;
            Email = email;
            PlaceOfStudy = placeOfStudy;
        }
    }
}
