using MediatR;

namespace GymBeam.Commands
{
    public class CreateReservationCommand : IRequest<Unit>
    {
        public int ActivityId { get; set; }
        public int UserId { get; set; }
        public DateTime StartTime { get; set; }
    }
}
