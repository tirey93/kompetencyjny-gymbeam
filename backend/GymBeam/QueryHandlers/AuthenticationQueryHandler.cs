using Domain;
using Domain.Exceptions;
using GymBeam.Queries;
using GymBeam.Response;
using GymBeam.Utils;
using MediatR;

namespace GymBeam.QueryHandlers
{
    public class AuthenticationQueryHandler 
        :IRequestHandler<LoginQuery, UserResponse>
    {
        private readonly IRepository _repository;

        public AuthenticationQueryHandler(IRepository repository)
        {
            _repository = repository;
        }

        public Task<UserResponse> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUsers(x => x.Name == request.Username).FirstOrDefault()
                ?? throw new UserNotFoundException(request.Username);

            if (request.Password != null)
            {
                var hash = ShaHelper.QuickHash(request.Password);
                if (hash.ToLower() != user.HashedPassword.ToLower())
                    throw new PasswordNotMatchException(request.Username);
            }

            return Task.FromResult(new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                DisplayName = user.DisplayName,
                Role = user.Role.ToString(),
                ReservationDisabled = user.ReservationDisabled,
            });
        }
    }
}
