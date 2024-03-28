using GymBeam.Response;
using MediatR;

namespace GymBeam.Queries
{
    public class GetAllUsersQuery : IRequest<IEnumerable<UserResponse>>
    {
    }
}
