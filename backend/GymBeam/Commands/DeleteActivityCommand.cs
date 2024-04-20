using MediatR;

namespace GymBeam.Commands
{
    public class DeleteActivityCommand : IRequest<Unit>
    {
        public int ActivityId { get; set; }
    }
}
