using Domain;
using Domain.Exceptions;
using GymBeam.Queries;
using GymBeam.Response;
using MediatR;

namespace GymBeam.QueryHandlers
{
    public class CheckUsernameAvailabilityQueryHandler : IRequestHandler<CheckUsernameAvailabilityQuery, bool>
    {
        private readonly IRepository _repository;

        public CheckUsernameAvailabilityQueryHandler(IRepository repository)
        {
            _repository = repository;
        }

        public Task<bool> Handle(CheckUsernameAvailabilityQuery request, CancellationToken cancellationToken)
        {
            var username = request.Username.ToLower();

            var users = _repository.Users 
                ?? throw new UsersNotFoundException();

            var existingUsers = users.Where(u => u.Name.ToLower() == username);
            var result = !existingUsers.Any();

            return Task.FromResult(result);
        }
    }
}
