using GymBeam.Response;
using MediatR;

namespace GymBeam.Queries
{
    public class GetUserByNameQuery : IRequest<UserResponse>
    {
        public string Username { get; set; }
    }
}
