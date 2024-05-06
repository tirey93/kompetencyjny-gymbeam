using MediatR;

namespace GymBeam.Commands
{
    public class DeleteReservationCommand : IRequest<Unit>
    {
        public int ReservationId { get; set; }
    }
}
