using Domain;
using Domain.Exceptions;
using GymBeam.Commands;
using GymBeam.Properties;
using MediatR;
using System.Security.Claims;

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

        public Task<Unit> Handle(CreateReservationCommand request, CancellationToken cancellationToken)
        {
            var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity 
                ?? throw new AuthenticationFailureException(Resource.ExceptionUserRoleNotFound);

            IEnumerable<Claim> claims = identity.Claims;
            var roleClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.Role);

            if (roleClaim.Value != Role.Admin.ToString())
            {
                if (request.UserId != request.LoggedUserId)
                {
                    throw new AuthenticationFailureException(Resource.ExceptionUserNotAllowed);
                }
            }

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
