using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using MediatR;
using GymBeam.Constants;
using GymBeam.Queries;
using GymBeam.Response;
using GymBeam.Properties;
using GymBeam.Exceptions;
using GymBeam.Commands;
using GymBeam.Requests;
using Domain.Exceptions;

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
            try
            {
                var query = new GetAllUsersQuery();
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (UserNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpGet("{id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public async Task<ActionResult<UserResponse>> Get(int id)
        {
            var query = new GetUserQuery
            {
                UserId = id
            };
            try
            {
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (UserNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
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
                if (!Request.Cookies.TryGetValue(Cookies.UserId, out string cookiesUserId))
                    throw new InvalidCookieException(Cookies.UserId);
                if (!int.TryParse(cookiesUserId, out id))
                    throw new InvalidUserIdException();
            }
            catch (InvalidCookieException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (InvalidUserIdException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }

            return await Get(id);
        }

        [HttpGet("CheckAvailability/ByName/{username}")]
        [AllowAnonymous]
        public async Task<ActionResult<bool>> CheckUsernameAvailability(string username)
        {
            var query = new CheckUsernameAvailabilityQuery
            {
                Username = username
            };
            try
            {
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpPut("User/{id:int}/Role")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public async Task<IActionResult> ChangeRole(int id, [FromBody] UpdateRoleRequest dto)
        {

            var request = new UpdateUserRoleCommand
            {
                UserId = id,
                NewRole = dto.NewRole
            };

            try
            {
                await _mediator.Send(request);
                return NoContent();
            }
            catch (UserNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpPut("User/{id:int}/ReservationDisabled")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public async Task<IActionResult> ChangeReservationDisabledFlag(int id, bool value)
        {
            var request = new UpdateUserReservationDisabledFlagCommand
            {
                UserId = id,
                NewReservationDisabledFlagValue = value
            };

            try
            {
                await _mediator.Send(request);
                return NoContent();
            }
            catch (UserNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
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
            catch (UserNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }
    }
}
