namespace StudForum.Dtos.Category
{
    public class CategoryResDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<SubcategoryRes> Subcategories { get; set; } =  new List<SubcategoryRes>();
    }

    public class SubcategoryRes
    {
        public int Id { get; set; }
        public string Name { get; set; }

    }
}
