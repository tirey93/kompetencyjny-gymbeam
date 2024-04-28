using Domain;
using GymBeam.Queries;
using GymBeam.Response;
using MediatR;

namespace GymBeam.QueryHandlers
{
    public class ReservationQueryHandler : IRequestHandler<GetAllReservationsQuery, IEnumerable<ReservationResponse>>
    {
        private readonly IRepository _repository;

        public ReservationQueryHandler(IRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<ReservationResponse>> Handle(GetAllReservationsQuery request, CancellationToken cancellationToken)
        {
            var reservations = _repository.GetReservations();

            if (reservations == null)
            {
                return Task.FromResult(Enumerable.Empty<ReservationResponse>());
            }

            var result = reservations.Select(x => new ReservationResponse
            {
                Id = x.Id,
                ActivityId = x.Activity.Id,
                UserId = x.User.Id,
                Duration = x.Activity.Duration,
                StartTime = x.StartTime,
                LeaderName = x.Activity.Leader.Name,
                ActivityName = x.Activity.Name,
                UserDisplayName = x.User.DisplayName
            }).ToList();

            return Task.FromResult<IEnumerable<ReservationResponse>>(result);
        }
    }
}
