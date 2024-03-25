using GymBeam.Constants;
using GymBeam.Requests;
using GymBeam.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymBeam.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservationController : ControllerBase
    {
        [HttpGet]
        [Authorize(Roles = Roles.Admin)]
        public ActionResult<IEnumerable<ReservationResponse>> Get()
        {

            return new List<ReservationResponse>
            {
                new ReservationResponse
                {
                    Id = 5,
                    ActivityId = 1,
                    ActivityName = "Joga",
                    Duration = 20,
                    LeaderName = "testLeaderName",
                    StartTime = DateTime.Now,
                    UserId = 56
                },
                new ReservationResponse
                {
                    Id = 8,
                    ActivityId = 2,
                    ActivityName = "Boks",
                    Duration = 90,
                    LeaderName = "testLeaderName2",
                    StartTime = DateTime.Now.AddHours(2),
                    UserId = 76
                }
            };
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = Roles.User)]
        public ActionResult<ReservationResponse> Get(int id)
        {
            return new ReservationResponse
            {
                Id = id,
                ActivityId = 6,
                ActivityName = "Taniec",
                Duration = 45,
                LeaderName = "LeaderTanca",
                StartTime = DateTime.Now.AddDays(2),
                UserId = 96
            };
        }

        [HttpPost]
        [Authorize(Roles = Roles.User)]
        public IActionResult Post([FromBody] ReservationRequest dto)
        {
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = Roles.User)]
        public ActionResult Delete(int id)
        {
            return NoContent();
        }

    }

}
