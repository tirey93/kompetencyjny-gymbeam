using MediatR;

namespace GymBeam.Commands
{
    public class CreateSubscriptionUserCommand : IRequest<string>
    {
        public int UserId { get; set; }
    }
}
