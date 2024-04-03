using GymBeam.Response;
using MediatR;

namespace GymBeam.Queries
{
    public class LoginQuery : IRequest<UserResponse>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
