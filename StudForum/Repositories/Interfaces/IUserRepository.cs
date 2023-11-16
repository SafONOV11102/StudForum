using StudForum.Models;

namespace StudForum.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public bool IsExist(string login);
        public bool IsEmailExist(string email);

        public Task<User?> AddAsync(string login, string name, string surname, string password, string placeOfStudy, DateTime birthDate, string city);
        public Task<User?> FindFirstAsync(string login);
        public Task<User?> GetByIdAsync(int id);

        public Task<User?> UpdateName(string name, int id);
        public Task UpdateChanges();

    }
}
