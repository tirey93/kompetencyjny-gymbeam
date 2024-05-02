using GymBeam.Properties;
using GymBeam.Queries;
using GymBeam.Requests;
using GymBeam.Response;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using MediatR;
using GymBeam.Commands;
using Domain.Exceptions;
using GymBeam.Exceptions;

namespace GymBeam.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ReservationController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status200OK)]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public async Task<ActionResult<IEnumerable<ReservationResponse>>> Get()
        {
            try
            {
                var query = new GetAllReservationsQuery();
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<ActionResult> Post([FromBody] ReservationRequest dto)
        {
            var request = new CreateReservationCommand
            {
                ActivityId = dto.ActivityId,
                UserId = dto.UserId,
                StartTime = dto.StartTime
            };
            try
            {
                await _mediator.Send(request);
                return NoContent();
            }
            catch (ReservationDisabledException ex)
            {
                return StatusCode((int)HttpStatusCode.Forbidden,
                    string.Format(Resource.ControllerForbidden, ex.Message));
            }
            catch (AuthenticationFailureException ex)
            {
                return StatusCode((int)HttpStatusCode.Forbidden,
                    string.Format(Resource.ControllerForbidden, ex.Message));
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
            catch (UserNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (ActivityNotFoundException ex)
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
        public ActionResult Delete(int id)
        {
            return NoContent();
        }

    }

}
