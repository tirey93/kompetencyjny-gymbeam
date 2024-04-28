using GymBeam.Response;
using MediatR;

namespace GymBeam.Queries
{
    public class GetAllReservationsQuery : IRequest<IEnumerable<ReservationResponse>>
    {
    }
}
