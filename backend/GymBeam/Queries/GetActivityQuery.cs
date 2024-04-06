using GymBeam.Responses;
using MediatR;

namespace GymBeam.Queries
{
    public class GetActivityQuery : IRequest<ActivityResponse>
    {
        public int ActivityId { get; set; }
    }
}
