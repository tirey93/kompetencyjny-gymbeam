using Domain;
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
            User user;
            try
            {
                user = _repository.GetById<User>(request.UserId);
                var result = new UserResponse
                {
                    Id = user.Id,
                    Name = user.Name,
                    DisplayName = user.DisplayName,
                    Role = user.Role
                };
                return Task.FromResult(result);
            }
            catch (Exception) 
            {
                throw new InvalidUserIdException();
            }
        }
    }
}
