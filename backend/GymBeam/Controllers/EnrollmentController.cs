using GymBeam.Constants;
using GymBeam.Exceptions;
using GymBeam.Properties;
using GymBeam.Queries;
using GymBeam.Responses;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace GymBeam.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EnrollmentController : ControllerBase
    {
        private readonly IMediator _mediator;
        public EnrollmentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("ByLoggedUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<ActionResult<IEnumerable<EnrollmentResponse>>> ByLoggedUser()
        {
            try
            {
                var query = new GetEnrollementsLoggedUserQuery();
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (InvalidCookieException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpGet("ByDates")]
        [AllowAnonymous]
        public ActionResult<IEnumerable<EnrollmentResponse>> GetByDates(DateTime from, DateTime to)
        {
            return new List<EnrollmentResponse>
            {
                new EnrollmentResponse
                {
                    ReservationId = 2,
                    ActivityId = 45,
                    LeaderId = 2,
                    SlotsTaken = 15,
                    TotalCapacity = 20,
                    StartTime = from,
                    Duration = 40,
                    Name = "Boks",
                    ShortDescription = "Short test description.",
                    LongDescription = "Looooooooooooooong test description.",
                    LeaderName = "Leader test name"
                },
                new EnrollmentResponse
                {
                    LeaderId = 2,
                    ActivityId = 45,
                    SlotsTaken = 15,
                    TotalCapacity = 20,
                    StartTime = to,
                    Duration = 40,
                    Name = "Boks",
                    ShortDescription = "Short test description.",
                    LongDescription = "Looooooooooooooong test description.",
                    LeaderName = "Leader test name"
                },
            };
        }
    }
}
