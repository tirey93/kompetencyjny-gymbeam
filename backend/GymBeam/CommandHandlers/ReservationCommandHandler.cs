using Domain;
using Domain.Exceptions;
using GymBeam.Commands;
using MediatR;

namespace GymBeam.CommandHandlers
{
    public class ReservationCommandHandler : IRequestHandler<CreateReservationCommand, Unit>
    {
        private readonly IRepository _repository;

        public ReservationCommandHandler(IRepository repository)
        {
            _repository = repository;
        }

        public Task<Unit> Handle(CreateReservationCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUser(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            var activity = _repository.GetActivity(request.ActivityId)
                ?? throw new ActivityNotFoundException(request.ActivityId);

            var reservation = new Reservation
            {
                Activity = activity,
                User = user,
                StartTime = request.StartTime
            };

            _repository.Add(reservation);
            _repository.SaveChangesAsync();

            return Task.FromResult(Unit.Value);
        }
    }
}
