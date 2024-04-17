using MediatR;
using GymBeam.Properties;
using GymBeam.Queries;
using GymBeam.Requests;
using GymBeam.Response;
using GymBeam.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using GymBeam.Constants;

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
        [AllowAnonymous]
        public ActionResult<ActivityResponse> Get(int id)
        {
            return new ActivityResponse
            {
                Id = id,
                Duration = 30,
                TotalCapacity = 15,
                LeaderId = 3,
                StartTime = DateTime.Now.AddDays(5),
                EndTime = DateTime.Now.AddDays(90),
                Name = "Karate",
                ShortDescription = "Short test description 3.",
                LongDescription = "Looooooooooooooong test description 3.",
                Cron = "0 15 * * TUE",
                LeaderName = "Leader test name 3"
            };
        }

        [HttpPost]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult Post([FromBody] ActivityRequest dto)
        {
            return NoContent();
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
