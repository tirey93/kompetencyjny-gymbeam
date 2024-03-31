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
        public ActionResult<UserResponse> Register([FromBody] RegisterRequest dto)
        {
            return new UserResponse
            {
                Id = 34,
                Name = dto.Username,
                DisplayName = dto.DisplayName,
                Role = "user",
                ReservationDisabled = false
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
                    .AppendToCookie(Cookies.AccessToken, new JwtSecurityTokenHandler().WriteToken(token))
                    .AppendToCookie(Cookies.UserId, userId.ToString());

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

        [HttpPost("Logout")]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public IActionResult Logout()
        {
            int userId;
            try
            {
                if (!Request.Cookies.TryGetValue(Cookies.UserId, out string cookiesUserId))
                    throw new InvalidCookieException(Cookies.UserId);
                if (!int.TryParse(cookiesUserId, out userId))
                    throw new InvalidUserIdException();

                return NoContent();
            }
            catch (InvalidCookieException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    $"BadRequest: {ex.Message}");
            }
            catch (InvalidUserIdException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    $"BadRequest: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
