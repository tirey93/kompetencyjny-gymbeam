using GymBeam.Responses;
using MediatR;

namespace GymBeam.Queries
{
    public class GetAllActivitiesQuery : IRequest<IEnumerable<ActivityResponse>>
    {
    }
}
