using StudForum.Models;

namespace StudForum.Repositories.Interfaces
{
    public interface IDiscussionRepository
    {
        public Task Init();
        public Task AddView(int id);
        public Task AddAnswer(int userId, int discussionId, string content);
        public Task<List<Answer>> GetAnswers(int discussionId);

        public Task<Discussion?> AddAsync(Discussion discussion);
        public Task<Discussion?> GetByIdAsync(int id);
        public Task<List<Discussion>> GetLatests();

        public Task<int> Count();

        public Task<List<Discussion>> GetPopular();
        public Task<List<Discussion>> GetPage(int page, int count, int categoryId, int filter);
        public Task<List<Discussion>> Search(string text);
        public Task<List<Discussion>> GetUserDiscussions(int userId);
    }
}
