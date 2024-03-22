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
        public IActionResult Register([FromBody] UserRequest dto)
        {
            return NoContent();
        }

        [HttpPost("Login")]
        public ActionResult<UserResponse> Login([FromBody] UserLoginRequest dto)
        {
            return new UserResponse
            {
                Id = 25,
                Login = dto.Login,
                DisplayName = "testDisplayName",
                Role = "User"
            };
        }

        [HttpPost("{id:int}/Logout")]
        public IActionResult Logout(int id)
        {
            return NoContent();
        }
    }
}
