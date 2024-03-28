using GymBeam.Constants;
using GymBeam.Requests;
using GymBeam.Response;
using GymBeam.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymBeam.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivityController : ControllerBase
    {
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<ActivityResponse>> Get()
        {

            return new List<ActivityResponse>
            {
                new ActivityResponse
                {
                    Id = 4,
                    Duration = 40,
                    TotalCapacity = 20,
                    LeaderId = 2,
                    StartTime = DateTime.Now.AddDays(2),
                    EndTime = DateTime.Now.AddDays(31),
                    Name = "Boks",
                    ShortDescription = "Short test description.",
                    LongDescription = "Looooooooooooooong test description.",
                    Cron = "0 15 * * TUE",
                    LeaderName = "Leader test name"
                },
                new ActivityResponse
                {
                    Id = 9,
                    Duration = 60,
                    TotalCapacity = 30,
                    LeaderId = 4,
                    StartTime = DateTime.Now.AddDays(4),
                    EndTime = DateTime.Now.AddDays(62),
                    Name = "Bieznia",
                    ShortDescription = "Short test description 1.",
                    LongDescription = "Looooooooooooooong test description 2.",
                    Cron = "0 12 * * FRI",
                    LeaderName = "Leader test name 2"
                }
            };
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
