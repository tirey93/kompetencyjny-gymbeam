using GymBeam.Response;
using MediatR;

namespace GymBeam.Queries
{
    public class GetUserQuery : IRequest<UserResponse>
    {
        public int UserId { get; set; }
    }
}
