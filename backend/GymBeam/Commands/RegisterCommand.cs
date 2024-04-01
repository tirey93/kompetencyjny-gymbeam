using GymBeam.Response;
using MediatR;

namespace GymBeam.Commands
{
    public class RegisterCommand : IRequest<UserResponse>
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
    }
}
