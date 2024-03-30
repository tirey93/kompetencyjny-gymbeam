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
using GymBeam.Commands;

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
        public async Task<ActionResult<UserResponse>> Get(int id)
        {
            var request = new GetUserQuery
            {
                UserId = id
            };
            try
            {
                var result = await _mediator.Send(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    $"BadRequest: {ex.Message}");
            }

        }

        [HttpGet("LoggedIn")]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<ActionResult<UserResponse>> GetLoggedIn()
        {
            int id;
            try
            {
                string cookiesUserId = Request.Cookies[Cookies.UserId];
                if (!int.TryParse(cookiesUserId, out id))
                    throw new InvalidUserIdException();

                var request = new GetUserQuery
                {
                    UserId = id
                };
                var result = await _mediator.Send(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    $"BadRequest: {ex.Message}");
            }
        }

        [HttpGet("CheckAvailability/ByName/{username}")]
        [AllowAnonymous]
        public async Task<ActionResult<bool>> CheckUsernameAvailability(string username)
        {
            var request = new CheckUsernameAvailabilityQuery
            {
                Username = username
            };
            var result = await _mediator.Send(request);
            return Ok(result);
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
        public async Task<ActionResult> Delete(int id)
        {
            var request = new DeleteUserCommand
            {
                UserId = id
            };

            try
            {
                await _mediator.Send(request);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    $"BadRequest: {ex.Message}");
            }
        }
    }
}
