using GymBeam.Requests;
using GymBeam.Response;
using GymBeam.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace GymBeam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        [HttpPost("Register")]
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
        public ActionResult<UserResponse> Login([FromBody] LoginRequest dto)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, "user"));

            var issuer = "https://mysite.com";
            var audience = "https://mysite.com";
            var signingKey = "12345@4321aaabbbcccddd";  //  some long id

            // create a new token with token helper and add our claim
            // from `Westwind.AspNetCore`  NuGet Package
            var token = JwtHelper.GetJwtToken(
                dto.Username,
                signingKey,
                issuer,
                audience,
                TimeSpan.FromMinutes(5),
                claims.ToArray());

            var token_2 = new JwtSecurityTokenHandler().WriteToken(token);

            Response.Cookies.Append("X-Access-Token", token_2, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

            return new UserResponse
            {
                Id = 25,
                Name = dto.Username,
                DisplayName = "testDisplayName",
                Role = "User"
            };
        }

        [HttpPost("Logout/User/{id:int}")]
        public IActionResult Logout(int id)
        {
            return NoContent();
        }
    }
}
