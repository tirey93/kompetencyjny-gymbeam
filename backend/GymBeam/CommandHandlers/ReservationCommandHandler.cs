using Domain;
using Domain.Exceptions;
using GymBeam.Commands;
using GymBeam.Properties;
using MediatR;
using GymBeam.Utils;
using GymBeam.Constants;
using GymBeam.Exceptions;

namespace GymBeam.CommandHandlers
{
    public class ReservationCommandHandler : IRequestHandler<CreateReservationCommand, Unit>
    {
        private readonly IRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ReservationCommandHandler(IRepository repository, IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Unit> Handle(CreateReservationCommand request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var user = _repository.GetUser(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            var userRole = JwtHelper.GetRoleClaimFromCookie(_httpContextAccessor) 
                ?? throw new AuthenticationFailureException(Resource.ExceptionUserRoleNotFound);

            if (userRole != Role.Admin.ToString() && request.UserId != loggedUserId)
                throw new AuthenticationFailureException(Resource.ExceptionUserNotAllowed);

            if (user.ReservationDisabled)
                throw new ReservationDisabledException(user.Id);

            var activity = _repository.GetActivity(request.ActivityId)
                ?? throw new ActivityNotFoundException(request.ActivityId);

            var reservation = new Reservation
            {
                Activity = activity,
                User = user,
                StartTime = request.StartTime
            };

            _repository.Add(reservation);
            await _repository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
