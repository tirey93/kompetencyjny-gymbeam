using GymBeam.Constants;
using GymBeam.Exceptions;
using GymBeam.Extensions;
using GymBeam.Requests;
using GymBeam.Response;
using GymBeam.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;

namespace GymBeam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AuthenticationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public ActionResult<UserResponse> Register([FromBody] UserRequest dto)
        {
            return new UserResponse
            {
                Id = 34,
                Name = dto.Name,
                DisplayName = dto.DisplayName,
                Role = dto.Role
            };
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public ActionResult<UserResponse> Login([FromBody] LoginRequest dto)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, Roles.Admin)
            };

            int userId = 25;
            try
            {
                var signingKey = Environment.GetEnvironmentVariable(_configuration["JWT:EnvironmentSecretVariableName"]);
                if (string.IsNullOrEmpty(signingKey))
                    throw new MissingSigningKeyException();

                var token = JwtHelper.GetJwtToken(
                    dto.Username,
                    signingKey,
                    _configuration["JWT:Issuer"],
                    _configuration["JWT:Audience"],
                    TimeSpan.FromMinutes(5),
                    claims.ToArray());

                Response.Cookies
                    .AppendToCookie("X-Access-Token", new JwtSecurityTokenHandler().WriteToken(token))
                    .AppendToCookie("X-User-Id", userId.ToString());

                return new UserResponse
                {
                    Id = 25,
                    Name = dto.Username,
                    DisplayName = "testDisplayName",
                    Role = "User"
                };
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPost("Logout/User/{id:int}")]
        [Authorize(Roles = Roles.User)]
        public IActionResult Logout(int id)
        {
            return NoContent();
        }
    }
}
