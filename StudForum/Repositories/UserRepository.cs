using Microsoft.EntityFrameworkCore;
using StudForum.Models;
using StudForum.Repositories.Interfaces;

namespace StudForum.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;

        }

        public bool IsExist(string login)
        {
            try
            {
                return _context.Users.FirstOrDefault(u => u.Login == login) != null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return true;
            }
        }

        public bool IsEmailExist(string email)
        {
            try
            {
                return _context.Users.Include(u => u.Profile).FirstOrDefault(u => u.Profile.Email == email) != null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return true;
            }
        }


        public async Task<User?> AddAsync(string login, string name, string surname, string password, string placeOfStudy, DateTime birthDate, string city)
        {
            try
            {
                login = login.ToLower();
                if (IsExist(login))
                    return null;

                Profile profile = (await _context.Profiles.AddAsync(new Profile(name, surname, city, birthDate, placeOfStudy))).Entity;
                User user = (await _context.Users.AddAsync(new User(login, BCrypt.Net.BCrypt.HashPassword(password), profile))).Entity;

                await _context.SaveChangesAsync();

                return await _context.Users.Include(u => u.Profile).FirstOrDefaultAsync(u => u.Id == user.Id);

            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.ToString());
                return null;
            }
        }

        public async Task<User?> FindFirstAsync(string login)
        {
            try
            {
                return await _context.Users.Include(u => u.Profile).FirstOrDefaultAsync(u => u.Login == login.ToLower());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return null;
            }
        }

        public async Task<User?> GetByIdAsync(int id) => await _context.Users.Include(u => u.Profile).Include(u => u.Discussions).Include(u => u.Answers).FirstOrDefaultAsync(u => u.Id == id);

        public async Task<User?> UpdateName(string name, int id)
        {
            try
            {
                if (name.Length < 2 && name.Length > 100)
                    return null;

                var user = await this.GetByIdAsync(id);
                user.Profile.Name = name;
                await _context.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return null;
            }
        }

        public async Task UpdateChanges()
        {
            await _context.SaveChangesAsync();
        }

    }
}
