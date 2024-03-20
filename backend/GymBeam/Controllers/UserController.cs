using GymBeam.Requests;
using GymBeam.Response;
using Microsoft.AspNetCore.Mvc;

namespace GymBeam.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<UserResponse>> Get()
        {

            return new List<UserResponse>
            {
                new UserResponse
                {
                    Id = 42,
                    Login = "testlogin",
                    DisplayName = "testDisplayName",
                    Role = "User"
                },
                new UserResponse
                {
                    Id = 57,
                    Login = "testlogin2",
                    DisplayName = "testDisplayName2",
                    Role = "Admin"
                }
            };
        }

        [HttpGet("{id:int}")]
        public ActionResult<UserResponse> Get(int id)
        {
            return new UserResponse
            {
                Id = id,
                Login = "testlogin",
                DisplayName = "testDisplayName",
                Role = "User"
            };
        }

        [HttpPost]
        public IActionResult Post([FromBody] UserRequest dto)
        {

            return NoContent();
        }

        [HttpPut("{id:int}")]
        public IActionResult Put(int id, UserRequest dto)
        {
            
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            return NoContent();
        }

        [HttpGet]
        [Route("{id:int}/Login")]
        public ActionResult<UserResponse> Login(int id)
        {
            return new UserResponse
            {
                Id = id,
                Login = "testlogin",
                DisplayName = "testDisplayName",
                Role = "User"
            };
        }

        [HttpPost]
        [Route("{id:int}/Logout")]
        public IActionResult Logout(int id)
        {
            return NoContent();
        }

        

    }

}
