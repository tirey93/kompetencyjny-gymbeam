using GymBeam.Requests;
using GymBeam.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GymBeam.Controllers;
using GymBeam.Constants;
using GymBeam.Queries;
using MediatR;

namespace GymBeam.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public async Task<ActionResult<IEnumerable<UserResponse>>> Get()
        {
            var request = new GetAllUsersQuery();
            var result = await _mediator.Send(request);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = Roles.User)]
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
        [AllowAnonymous]
        public ActionResult<bool> CheckUsernameAvailability(string username)
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
            return isUsernameAvailable;
        }

        [HttpPut("{id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public IActionResult Put(int id, UserRequest dto)
        {
            
            return NoContent();
        }

        [HttpDelete("{id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public ActionResult Delete(int id)
        {
            return NoContent();
        }
    }
}
