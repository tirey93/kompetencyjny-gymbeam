using Domain;
using Domain.Exceptions;
using GymBeam.Response;
using MediatR;

namespace GymBeam.Queries
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, IEnumerable<UserResponse>>
    {
        private readonly IRepository _repository;

        public GetAllUsersQueryHandler(IRepository repository) 
        {
            _repository = repository;
        }
        public Task<IEnumerable<UserResponse>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            var users = _repository.Users
                ?? throw new UsersNotFoundException();

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
