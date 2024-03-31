using Domain;
using Domain.Exceptions;
using GymBeam.Exceptions;
using GymBeam.Response;
using MediatR;
using System.Net;

namespace GymBeam.Queries
{
    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, UserResponse>
    {
        private readonly IRepository _repository;

        public GetUserQueryHandler(IRepository repository) 
        {
            _repository = repository;
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
    }
}
