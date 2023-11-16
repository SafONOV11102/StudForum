using Microsoft.EntityFrameworkCore;
using StudForum.Models;

namespace StudForum
{
    public class AppDbContext : DbContext
    {

        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Discussion> Discussions { get; set; }
        public DbSet<Answer> Answers { get; set; }  
        public DbSet<Category> Categories { get; set; }
        public DbSet<Subcategory> Subcategories { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder m)
        {
            m.Entity<User>()
                .HasOne(u => u.Profile)
                .WithOne(p => p.User)
                .HasForeignKey<Profile>(p => p.UserId)
                .IsRequired();

            m.Entity<Discussion>()
                .HasOne(d => d.CreatedUser)
                .WithMany(u => u.Discussions)
                .HasForeignKey(d => d.CreatedUserId);

            m.Entity<Answer>()
                .HasOne(a => a.CreatedUser)
                .WithMany(u => u.Answers)
                .HasForeignKey(a => a.CreatedUserId);

            m.Entity<Answer>()
                .HasOne(a => a.Discussion)
                .WithMany(d => d.Answers)
                .HasForeignKey(a => a.DiscussionId);

            m.Entity<Subcategory>()
                .HasOne(s => s.Category)
                .WithMany(c => c.Subcategories)
                .HasForeignKey(s => s.CategoryId);

            m.Entity<Discussion>()
                .HasOne(d => d.Category)
                .WithMany(c => c.Discussions)
                .HasForeignKey(d => d.CategoryId);

            m.Entity<Discussion>()
                .HasOne(d => d.Subcategory)
                .WithMany(s => s.Discussions)
                .HasForeignKey(d => d.SubcategoryId);

            base.OnModelCreating(m);

        }

    }
}
