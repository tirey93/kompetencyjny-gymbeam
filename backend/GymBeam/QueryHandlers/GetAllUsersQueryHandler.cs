using Domain;
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
        public async Task<IEnumerable<UserResponse>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            // Create
            Console.WriteLine("Inserting a new user");
            _repository.Add(new User
            {
                Name = "testUsernameTheSecondOne",
                DisplayName = "testDisplayName2",
                Role = "User",
                Password = "Passworddddd",
                ReservationDisabled = false,
            }); ;
            await _repository.SaveChangesAsync();

            // Read
            Console.WriteLine("Querying for a blog");
            var blog = _repository.Users;
            var result = blog.Select(x => new UserResponse
            {
                Id = x.Id,
                Name = x.Name,
                DisplayName = x.DisplayName,
                Role = x.Role
            }).ToList();

            return result;
        }
    }
}
