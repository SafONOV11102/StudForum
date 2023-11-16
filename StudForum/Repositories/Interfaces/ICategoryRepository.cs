using StudForum.Models;

namespace StudForum.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        public Task InitCategories();

        public Task<Category?> AddCategoryAsync(Category category);
        public Task<Subcategory?> AddSubcategoryAsync(Subcategory category);
        public Task<Category?> GetByCategoryIdAsync(int id);
        public Task<Subcategory?> GetBySubcategoryIdAsync(int id);
        public Task<List<Category>> GetAllAsync();
    }
}
