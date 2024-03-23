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
                    Name = "testUsername",
                    DisplayName = "testDisplayName",
                    Role = "User"
                },
                new UserResponse
                {
                    Id = 57,
                    Name = "testUsername2",
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
                Name = "testUsername",
                DisplayName = "testDisplayName",
                Role = "User"
            };
        }

        [HttpGet("CheckAvailability/ByName/{username}")]
        public IActionResult CheckUsernameAvailability(string username)
        {
            bool isUsernameAvailable;

            if (username.ToLower() == "test1" || (username.ToLower() == "test2"))
            {
                isUsernameAvailable = true;
            }
            else
            {
                isUsernameAvailable = false;
            }
            return Ok(isUsernameAvailable);
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
    }
}
