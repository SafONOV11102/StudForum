using Microsoft.EntityFrameworkCore;
using StudForum.Models;
using StudForum.Repositories.Interfaces;

namespace StudForum.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _context;

        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task InitCategories()
        {
            var category = await AddCategoryAsync(new Models.Category("Спорт"));
            

            await _context.Subcategories.AddRangeAsync(
                new Subcategory("Футбол", category),
                new Subcategory("Баскетбол", category),
                new Subcategory("Единоборство", category),
                new Subcategory("Плавание", category),
                new Subcategory("Гимнастика", category)
            );
            category =  await AddCategoryAsync(new Models.Category("Образование"));
            
            await _context.Subcategories.AddRangeAsync(
                new Subcategory("Медицина", category),
                new Subcategory("Программирование", category),
                new Subcategory("Экономика", category),
                new Subcategory("Школа", category)
            );

            category =  await AddCategoryAsync(new Models.Category("Путешествие"));

            await _context.Subcategories.AddRangeAsync(
                new Subcategory("Советы", category),
                new Subcategory("Поиск попутчиков", category),
                new Subcategory("Интересные места", category)
            );

            category = await AddCategoryAsync(new Models.Category("Технологии"));

            await _context.Subcategories.AddRangeAsync(
                new Subcategory("Новости и тренды", category),
                new Subcategory("Сайты для IT-специалиство", category),
                new Subcategory("ПО и гаджеты", category)
            );

            category = await AddCategoryAsync(new Models.Category("Транспорт"));

            await _context.Subcategories.AddRangeAsync(
                new Subcategory("Авто", category),
                new Subcategory("Мото", category),
                new Subcategory("Самолеты", category),
                new Subcategory("Лодки", category)
            );

            category = await AddCategoryAsync(new Models.Category("Развлечения"));

            await _context.Subcategories.AddRangeAsync(
                new Subcategory("Кино", category),
                new Subcategory("Игры", category),
                new Subcategory("Видеоигры", category)
            );

            category = await AddCategoryAsync(new Models.Category("Кулинария"));

            await _context.Subcategories.AddRangeAsync(
                new Subcategory("Рецепты", category),
                new Subcategory("Веганская кухня", category)
            );

            category = await AddCategoryAsync(new Models.Category("Творчество"));

            await _context.Subcategories.AddRangeAsync(
                new Subcategory("Литература", category),
                new Subcategory("Рисование", category),
                new Subcategory("Музыка", category)
            );

            await _context.SaveChangesAsync();
        }

        public async Task<Category?> AddCategoryAsync(Category category)
        {
            try
            {
                var result = (await _context.Categories.AddAsync(category)).Entity;
                await _context.SaveChangesAsync();
                return result;
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return null;
            }
        }

        public async Task<Subcategory?> AddSubcategoryAsync(Subcategory subcategory)
        {
            try
            {
                var result = (await _context.Subcategories.AddAsync(subcategory)).Entity;
                await _context.SaveChangesAsync();
                return result;
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return null;
            }
        }

        public async Task<List<Category>> GetAllAsync() => await _context.Categories.Include(c => c.Subcategories).ToListAsync();


        public async Task<Category?> GetByCategoryIdAsync(int id) => await _context.Categories.Include(c => c.Subcategories).FirstOrDefaultAsync(c => c.Id == id);
        public async Task<Subcategory?> GetBySubcategoryIdAsync(int id) => await _context.Subcategories.Include(c => c.Category).FirstOrDefaultAsync(c => c.Id == id);
    }
}
