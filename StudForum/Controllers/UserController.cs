using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using StudForum.Attributes;
using StudForum.Dtos.User;
using StudForum.Models;
using StudForum.Repositories;
using StudForum.Repositories.Interfaces;
using StudForum.Services;

namespace StudForum.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("ReactPolicy")]
    public class UserController : Controller
    {
        private readonly IUserRepository _rep;

        private readonly JwtService _jwtService;

        public UserController(IUserRepository rep, JwtService jwtService)
        {
            _rep = rep;
            _jwtService = jwtService;
        }

        [Route("reg")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Registration(RegDto userDto)
        {
            try
            {
                if (_rep.IsExist(userDto.Login))
                {
                    return Unauthorized(new
                    {
                        error = "Логин занят"
                    });
                }


                User? user = await _rep.AddAsync(userDto.Login, userDto.Name, userDto.Surname, userDto.Password, userDto.PlaceOfStudy, userDto.DateOfBirth, "Неизвестно");

                if (user == null)
                {
                    return StatusCode(500, new
                    {
                        error = "Не удалось создать аккаунт"
                    });
                }

                string token = _jwtService.Generate(user.Login, user.Id, user.Profile.Name, user.Profile.Surname);

                return Ok(new
                {
                    token
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        [Route("login")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            try
            {
                User? user = await _rep.FindFirstAsync(dto.Login);
                if (user == null)
                {
                    return Unauthorized(new
                    {
                        error = "Логин не существует"
                    });
                }

                if (user.CheckPassword(dto.Password))
                {
                    return Unauthorized(new
                    {
                        error = "Неверный пароль"
                    });
                }

                string token = _jwtService.Generate(user.Login, user.Id, user.Profile.Name, user.Profile.Surname);

                return Ok(new
                {
                    token
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    error = "Ошибка сервера"
                });
            }

        }

        [HttpGet]
        [Route("authentication")]
        [JwtAuth]
        public async Task<IActionResult> Authentication()
        {
            try
            {
                var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                var user = _jwtService.Verify(token);
                if (user == null)
                    return Unauthorized(new { error = "Токен недействителен !" });

                if (user.Claims?.FirstOrDefault(c => c.Type == "login") == null)
                    return Unauthorized(new { error = "Токен недействителен !" });

                var resultUser = await _rep.FindFirstAsync(user.Claims.First(c => c.Type == "login").Value);

                if (resultUser == null)
                    return Unauthorized(new { error = "Токен недействителен !" });

                return Ok(new
                {
                    login = resultUser.Login,
                    userId = resultUser.Id,
                    name = resultUser.Profile?.Name,
                    surname = resultUser.Profile?.Surname,
                    avatar = resultUser.Profile.AvatarUrl
                });
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.ToString());
                return StatusCode(500, new
                {
                    error = "Ошибка сервера"
                });
            }
        }

        [HttpGet]
        [Route("getprofile")]
        [JwtAuth]
        public async Task<IActionResult> GetProfile(int userId)
        {
            try
            {
                var user = await _rep.GetByIdAsync(userId);

                if (user == null) return NotFound();

                return Ok(new
                {
                    date = user.Profile.BirthDate.ToString("yyyy-MM-dd"),
                    city = user.Profile.City,
                    email = user.Profile.Email,
                    createdDis = user.Discussions.Count(),
                    answers = user.Answers.Count()
                });
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPut]
        [Route("updateprofile")]
        [JwtAuth]
        public async Task<IActionResult> UpdateProfile(UpdateProfileDto dto)
        {
            try
            {
                var user = await _rep.GetByIdAsync(dto.UserId);
                switch(dto.Type)
                {
                    case "name":
                        user.Profile.Name = dto.Value;
                        break;
                    case "surname":
                        user.Profile.Surname = dto.Value;
                        break;
                    case "date":
                        user.Profile.BirthDate = DateTime.Parse(dto.Value);
                        break;
                    case "city":
                        user.Profile.City = dto.Value;
                        break;
                    case "login":
                        if (_rep.IsExist(dto.Value))
                            return BadRequest(new { error = "Логин занят" });
                        user.Login = dto.Value;
                        break;
                    case "email":
                        if (_rep.IsEmailExist(dto.Value))
                            return BadRequest(new { error = "Почта занята" });
                        user.Profile.Email = dto.Value;
                        break;
                    case "password":
                        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Value);
                        break;
                }

                await _rep.UpdateChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }
    }
}
