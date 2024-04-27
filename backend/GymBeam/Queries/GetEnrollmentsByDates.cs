using GymBeam.Responses;
using MediatR;

namespace GymBeam.Queries
{
    public class GetEnrollmentsByDates : IRequest<IEnumerable<EnrollmentResponse>>
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public int? UserId { get; set; }
    }
}
