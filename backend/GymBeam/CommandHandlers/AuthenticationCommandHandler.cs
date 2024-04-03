using Domain;
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

        Task<UserResponse> IRequestHandler<RegisterCommand, UserResponse>.Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var hash = ShaHelper.QuickHash(request.Password);
            var user = new User 
            { 
                Name = request.Username,
                DisplayName = request.DisplayName,
                ReservationDisabled = false,
                Password = hash,
            };
            _repository.Add(user);
            _repository.SaveChangesAsync();

            return Task.FromResult(new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                DisplayName = user.DisplayName,
                Role = user.Role,
                ReservationDisabled = user.ReservationDisabled,
            });
        }
    }
}
