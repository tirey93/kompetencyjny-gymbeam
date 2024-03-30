using GymBeam.Requests;
using GymBeam.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GymBeam.Controllers;
using GymBeam.Constants;
using GymBeam.Queries;
using MediatR;
using System.Net;
using GymBeam.Exceptions;

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
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
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

        [HttpGet("LoggedIn")]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public ActionResult<UserResponse> GetLoggedIn()
        {
            int userId;
            try
            {
                string cookiesUserId = Request.Cookies[Cookies.UserId];
                if (!int.TryParse(cookiesUserId, out userId))
                    throw new InvalidUserIdException();

                return new UserResponse
                {
                    Id = userId,
                    Name = "loggedInUser",
                    DisplayName = "loggedInUserDisplayName",
                    Role = "User",
                    ReservationDisabled = false
                };
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    $"BadRequest: {ex.Message}");
            }
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

        [HttpPut("User/{id:int}/Role")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult ChangeRole(int id, string role)
        {
            return NoContent();
        }

        [HttpPut("User/{id:int}/ReservationDisabled")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult ChangeReservationDisabledFlag(int id, bool value)
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
