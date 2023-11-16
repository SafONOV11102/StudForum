using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudForum.Attributes;
using StudForum.Dtos.Discussion;
using StudForum.Models;
using StudForum.Repositories.Interfaces;

namespace StudForum.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactPolicy")]
    public class DiscussionController : Controller
    {
        private readonly IDiscussionRepository _rep;
        private readonly IUserRepository _userRep;
        private readonly ICategoryRepository _categoryRep;
        private readonly IWebHostEnvironment _env;

        public DiscussionController(IDiscussionRepository rep, IUserRepository userRepository, ICategoryRepository categoryRepository, IWebHostEnvironment env)
        {
            _rep = rep;
            _userRep = userRepository;
            _categoryRep = categoryRepository;
            _env = env;
        }

        [HttpPost]
        [Route("create")]
        [JwtAuth]
        public async Task<IActionResult> Create([FromForm] string title, [FromForm]IFormFile poster, [FromForm] string text, [FromForm]int userId, [FromForm]int subcategoryId)
        {
            await Console.Out.WriteLineAsync($"\n\nNAME {title}\n\n\n");
            try
            {
                string path = $"/images/{Guid.NewGuid()}_{poster.FileName}";

                using (var fileStream = new FileStream(_env.WebRootPath + path, FileMode.Create))
                {
                    await poster.CopyToAsync(fileStream);
                }

                Subcategory subcategory = await _categoryRep.GetBySubcategoryIdAsync(subcategoryId);
                var d = await _rep.AddAsync(new Models.Discussion(title, text, await _userRep.GetByIdAsync(userId), subcategory.Category, subcategory, path, ""));
                return Ok(new { discussionId = d.Id});
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("getlatests")]
        [JwtAuth]
        public async Task<IActionResult> GetLatests()
        {
            try
            {
                var result = await _rep.GetLatests();

                return Ok(result);
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("getpopular")]
        [JwtAuth]
        public async Task<IActionResult> GetPopular()
        {
            try
            {
                return Ok(await _rep.GetPopular());
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet]
        [Route("getcount")]
        [JwtAuth]
        public async Task<IActionResult> GetCount()
        {
            try
            {
                return Ok(new
                {
                    count = await _rep.Count()
                });
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("getpage")]
        [JwtAuth]
        public async Task<IActionResult> GetPage(int count, int page, int categoryId, int filter)
        {
            try
            {

                return Ok(await _rep.GetPage(page, count, categoryId, filter));
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("getbyid")]
        [JwtAuth]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                await _rep.AddView(id);
                var result = await _rep.GetByIdAsync(id);
                var user = await _userRep.GetByIdAsync(result.CreatedUserId);
                return Ok(new
                {
                    title = result.Title,
                    content = result.Content,
                    createdDate = result.CreatedDate,
                    views = result.Views,
                    name = user.Profile.Name,
                    surname = user.Profile.Surname,
                    login = user.Login,
                    avatarUrl = user.Profile.AvatarUrl,
                    posterUrl = result.PosterUrl
                });
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPost]
        [Route("addanswer")]
        [JwtAuth]
        public async Task<IActionResult> AddAnswer(AddAnswerDto dto)
        {
            try
            {
                await _rep.AddAnswer(dto.UserId, dto.DiscussionId, dto.Content);
                return Ok();
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("getanswers")]
        [JwtAuth]
        public async Task<IActionResult> GetAnswers(int discussionId)
        {
            try
            {
                var result = new List<GetAnswersResDto>();

                foreach (var i in await _rep.GetAnswers(discussionId))
                {
                    result.Add(new GetAnswersResDto()
                    {
                        Content = i.Content,
                        Name = i.CreatedUser.Profile.Name,
                        Surname = i.CreatedUser.Profile.Surname,
                        Login = i.CreatedUser.Login,
                        Date = i.CreatedDate.ToString("dd.MM.yy hh:mm"),
                        AvatarUrl = i.CreatedUser.Profile.AvatarUrl
                    });
                }

                return Ok(result);
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("search")]
        [JwtAuth]
        public async Task<IActionResult> Search(string text)
        {
            try
            {
                return Ok(await _rep.Search(text));
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("getuserdiscussions")]
        [JwtAuth]
        public async Task<IActionResult> GetUserDiscussions(int userId)
        {
            try
            {
                return Ok(await _rep.GetUserDiscussions(userId));
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }
    }
}
