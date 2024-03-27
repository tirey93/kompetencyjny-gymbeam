using GymBeam.Constants;
using GymBeam.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GymBeam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentController : ControllerBase
    {
        [HttpGet("ByUserId/{id:int}")]
        [Authorize(Roles = Roles.User)]
        public ActionResult<IEnumerable<EnrollmentResponse>> ByUserId(int id)
        {
            return new List<EnrollmentResponse>
            {
                new EnrollmentResponse
                {
                    LeaderId = 2,
                    ActivityId = 45,
                    SlotsTaken = 18,
                    TotalCapacity = 20,
                    StartTime = DateTime.Now.AddDays(2),
                    Duration = 40,
                    Name = "Boks",
                    ShortDescription = "Short test description.",
                    LongDescription = "Looooooooooooooong test description.",
                    LeaderName = "Leader test name"
                },
            };
        }

        [HttpGet("ByDates")]
        [AllowAnonymous]
        public ActionResult<IEnumerable<EnrollmentResponse>> GetByDates(DateTime from, DateTime to)
        {
            return new List<EnrollmentResponse>
            {
                new EnrollmentResponse
                {
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
