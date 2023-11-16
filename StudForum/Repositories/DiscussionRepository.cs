using Microsoft.EntityFrameworkCore;
using StudForum.Models;
using StudForum.Repositories.Interfaces;

namespace StudForum.Repositories
{
    public class DiscussionRepository : IDiscussionRepository
    {
        private readonly AppDbContext _context;

        public DiscussionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Discussion?> AddAsync(Discussion discussion)
        {
            try
            {
                var res = (await _context.Discussions.AddAsync(discussion)).Entity;
                await _context.SaveChangesAsync();
                return res;
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return null;
            }
        }

        public async Task<Discussion?> GetByIdAsync(int id) => await _context.Discussions.FirstOrDefaultAsync(d => d.Id == id);

        public async Task<List<Discussion>> GetLatests() => _context.Discussions.Count() > 6 ? await _context.Discussions.OrderByDescending(d => d.Id).Take(6).ToListAsync() : await _context.Discussions.ToListAsync();
        
        public async Task<int> Count() => await _context.Discussions.CountAsync();

        public async Task<List<Discussion>> GetPage(int page, int count, int categoryId, int filter)
        {
            try
            {
                var result = new List<Discussion>();

                switch (filter)
                {
                    case 1:
                        if (categoryId != 0)
                            result = await _context.Discussions.Where(d => d.SubcategoryId == categoryId).OrderByDescending(d => d.Id).Skip((page * count) - count).Take(count).ToListAsync();
                        else
                            result = await _context.Discussions.OrderByDescending(d => d.Id).Skip((page * count) - count).Take(count).ToListAsync();
                        break;

                    case 2:
                        if (categoryId != 0)
                            result = await _context.Discussions.Where(d => d.SubcategoryId == categoryId).OrderBy(d => d.Id).Skip((page * count) - count).Take(count).ToListAsync();
                        else
                            result = await _context.Discussions.OrderBy(d => d.Id).Skip((page * count) - count).Take(count).ToListAsync();
                        break;

                    case 3:
                        if (categoryId != 0)
                            result = await _context.Discussions.Where(d => d.SubcategoryId == categoryId).OrderBy(d => d.Views).Skip((page * count) - count).Take(count).ToListAsync();
                        else
                            result = await _context.Discussions.OrderBy(d => d.Views).Skip((page * count) - count).Take(count).ToListAsync();
                        break;
                }

               

                return result;

            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return new List<Discussion>();
            }
        }

        public async Task AddView(int id)
        {
            try
            {
                var dis = await this.GetByIdAsync(id);
                if (dis != null) dis.Views++;
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
        }

        public async Task AddAnswer(int userId, int discussionId, string content)
        {
            try
            {
                await _context.Answers.AddAsync(new Answer(await this.GetByIdAsync(discussionId), content, await _context.Users.FirstOrDefaultAsync(u => u.Id == userId)));
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
        }

        public async Task<List<Discussion>> GetPopular()
        {
            try
            {
                return await _context.Discussions.OrderByDescending(d => d.Views).Take(6).ToListAsync();
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return new List<Discussion>();
            }
        }

        public async Task<List<Answer>> GetAnswers(int discussionId)
        {
            try
            {
                return await _context.Answers.Include(a => a.CreatedUser.Profile).Where(a => a.DiscussionId == discussionId).ToListAsync() ?? new List<Answer>();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<Answer>();
            }
        }

        public async Task<List<Discussion>> Search(string text)
        {
            try
            {
                return await _context.Discussions.Where(d => d.Title.Contains(text) || d.Content.Contains(text)).ToListAsync();
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return new List<Discussion>();
            }
        }

        public async Task<List<Discussion>> GetUserDiscussions(int userId)
        {
            try
            {
                return await _context.Discussions.Where(u => u.CreatedUserId == userId).ToListAsync();
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return new List<Discussion>();
            }
        }

        public async Task Init()
        {

        }

    }
}
