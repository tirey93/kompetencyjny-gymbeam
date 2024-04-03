using MediatR;

namespace GymBeam.Commands
{
    public class UpdateUserReservationDisabledFlagCommand : IRequest<Unit>
    {
        public int UserId { get; set; }
        public bool NewReservationDisabledFlagValue { get; set; }
    }
}
