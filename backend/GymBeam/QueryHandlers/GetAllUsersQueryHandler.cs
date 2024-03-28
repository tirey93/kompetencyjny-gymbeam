using GymBeam.Domain;
using GymBeam.Response;
using MediatR;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;

namespace GymBeam.Queries
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, IEnumerable<UserResponse>>
    {
        IAppDbContext _appDbContext;
        public GetAllUsersQueryHandler(IAppDbContext appDbContext) 
        {
            _appDbContext = appDbContext;
        }
        public async Task<IEnumerable<UserResponse>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            // Create
            Console.WriteLine("Inserting a new user");
            _appDbContext.AddEntity(new User
            {
                Name = "testUsernameTheSecondOne",
                DisplayName = "testDisplayName2",
                Role = "User",
                Password = "Passworddddd",
                ReservationDisabled = false,
                testDate = DateTime.Now
            }); ;
            await _appDbContext.SaveAsync();

            // Read
            Console.WriteLine("Querying for a blog");
            var blog = _appDbContext.Users.ToList();
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
