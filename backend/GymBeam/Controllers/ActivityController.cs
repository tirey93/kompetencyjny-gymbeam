using MediatR;
using GymBeam.Properties;
using GymBeam.Queries;
using GymBeam.Requests;
using GymBeam.Response;
using GymBeam.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Domain.Exceptions;
using GymBeam.Commands;

namespace GymBeam.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivityController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ActivityController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ActivityResponse>>> Get()
        {
            try
            {
                var query = new GetAllActivitiesQuery();
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [AllowAnonymous]
        public async Task<ActionResult<ActivityResponse>> Get(int id)
        {
            var query = new GetActivityQuery
            {
                ActivityId = id
            };
            try
            {
                var result = await _mediator.Send(query);
                return Ok(result);
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

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public async Task<ActionResult> Post([FromBody] ActivityRequest dto)
        {
            var request = new CreateActivityCommand
            {
                Duration = dto.Duration,
                TotalCapacity = dto.TotalCapacity,
                LeaderId = dto.LeaderId,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                Name = dto.Name,
                ShortDescription = dto.ShortDescription,
                LongDescription = dto.LongDescription,
                Cron = dto.Cron
            };
            try
            {
                await _mediator.Send(request);
                return Ok();
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

        [HttpPut("{id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult Put(int id, ActivityRequest dto)
        {

            return NoContent();
        }

        [HttpDelete("{id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public ActionResult Delete(int id)
        {
            return NoContent();
        }

    }

}
