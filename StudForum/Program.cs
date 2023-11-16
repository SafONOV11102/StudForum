using Microsoft.EntityFrameworkCore;
using StudForum;
using StudForum.Repositories;
using StudForum.Repositories.Interfaces;
using StudForum.Services;

var builder = WebApplication.CreateBuilder(args);

const string FrontUrl = "https://localhost:44459";

builder.Services.AddCors(o => o.AddPolicy("ReactPolicy", builder =>
{
    builder
    .WithOrigins(FrontUrl)
    .AllowAnyMethod()
    .AllowCredentials()
    .AllowAnyHeader();
}));

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    //options.UseMySql(builder.Configuration.GetConnectionString("MySql"), new MySqlServerVersion(new Version(8, 0, 33)));
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer"));
});

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IDiscussionRepository, DiscussionRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

builder.Services.AddScoped<JwtService>();

var app = builder.Build();



// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("ReactPolicy");


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
