using Domain;
using GymBeam.Commands;
using GymBeam.Exceptions;
using MediatR;

namespace GymBeam.CommandHandlers
{
    public class UpdateUserReservationDisabledFlagCommandHandler : IRequestHandler<UpdateUserReservationDisabledFlagCommand, Unit>
    {
        private readonly IRepository _repository;

        public UpdateUserReservationDisabledFlagCommandHandler(IRepository repository)
        {
            _repository = repository;
        }

        public Task<Unit> Handle(UpdateUserReservationDisabledFlagCommand request, CancellationToken cancellationToken)
        {
            User user;
            try
            {
                user = _repository.GetById<User>(request.UserId);
                user.ReservationDisabled = request.NewReservationDisabledFlagValue;
                _repository.SaveChangesAsync();
                return Task.FromResult(Unit.Value);
            }
            catch (Exception)
            {
                throw new InvalidUserIdException();
            }
        }
    }
}
