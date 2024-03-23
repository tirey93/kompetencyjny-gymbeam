using GymBeam.Requests;
using GymBeam.Response;
using Microsoft.AspNetCore.Mvc;

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
                Login = dto.Login,
                DisplayName = dto.DisplayName,
                Role = dto.Role
            };
        }

        [HttpPost("Login")]
        public ActionResult<UserResponse> Login([FromBody] LoginRequest dto)
        {
            return new UserResponse
            {
                Id = 25,
                Login = dto.Login,
                DisplayName = "testDisplayName",
                Role = "User"
            };
        }

        [HttpPost("Logout")]
        public IActionResult Logout(int user_id)
        {
            return NoContent();
        }
    }
}
