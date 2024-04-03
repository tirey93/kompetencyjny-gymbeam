using Domain;
using Domain.Exceptions;
using GymBeam.Queries;
using GymBeam.Response;
using MediatR;

namespace GymBeam.QueryHandlers
{
    public class UserQueryHandler : IRequestHandler<CheckUsernameAvailabilityQuery, bool>,
                                    IRequestHandler<GetUserQuery, UserResponse>,
                                    IRequestHandler<GetAllUsersQuery, IEnumerable<UserResponse>>
    {
        private readonly IRepository _repository;

        public UserQueryHandler(IRepository repository)
        {
            _repository = repository;
        }

        public Task<bool> Handle(CheckUsernameAvailabilityQuery request, CancellationToken cancellationToken)
        {
            var username = request.Username.ToLower();

            var users = _repository.Users;
            if (users == null || !users.Any())
                return Task.FromResult(true);

            var existingUsers = users.Where(u => u.Name.ToLower() == username);
            var result = !existingUsers.Any();

            return Task.FromResult(result);
        }

        public Task<UserResponse> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var user = _repository.GetById<User>(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            var result = new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                DisplayName = user.DisplayName,
                Role = user.Role
            };
            return Task.FromResult(result);
        }

        public Task<IEnumerable<UserResponse>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            var users = _repository.Users;

            if (users == null || !users.Any())
            {
                return Task.FromResult<IEnumerable<UserResponse>>(Enumerable.Empty<UserResponse>());
            }

            var result = users.Select(x => new UserResponse
            {
                Id = x.Id,
                Name = x.Name,
                DisplayName = x.DisplayName,
                Role = x.Role
            }).ToList();

            return Task.FromResult<IEnumerable<UserResponse>>(result);
        }
    }
}
