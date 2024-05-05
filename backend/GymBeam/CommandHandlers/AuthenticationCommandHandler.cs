using Domain;
using Domain.Exceptions;
using GymBeam.Commands;
using GymBeam.Response;
using GymBeam.Utils;
using MediatR;

namespace GymBeam.CommandHandlers
{
    public class AuthenticationCommandHandler
        : IRequestHandler<RegisterCommand, UserResponse>
    {
        private readonly IRepository _repository;

        public AuthenticationCommandHandler(IRepository repository)
        {
            _repository = repository;
        }

        async Task<UserResponse> IRequestHandler<RegisterCommand, UserResponse>.Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var userExists = _repository.GetUsers(x => x.Name == request.Username).FirstOrDefault();
            if (userExists != null)
                throw new UserAlreadyExistsException(request.Username);

            var hash = ShaHelper.QuickHash(request.Password);
            var user = new User 
            { 
                Name = request.Username,
                DisplayName = request.DisplayName,
                ReservationDisabled = false,
                HashedPassword = hash,
                Role = Role.User
            };
            _repository.Add(user);
            await _repository.SaveChangesAsync();

            return new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                DisplayName = user.DisplayName,
                Role = user.Role.ToString(),
                ReservationDisabled = user.ReservationDisabled,
            };
        }
    }
}
