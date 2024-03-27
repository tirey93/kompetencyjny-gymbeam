using GymBeam.Response;
using MediatR;

namespace GymBeam.Queries
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, IEnumerable<UserResponse>>
    {
        public async Task<IEnumerable<UserResponse>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            return new List<UserResponse>
            {
                new UserResponse
                {
                    Id = 42,
                    Name = "testUsername",
                    DisplayName = "testDisplayName",
                    Role = "User"
                },
                new UserResponse
                {
                    Id = 57,
                    Name = "testUsername2",
                    DisplayName = "testDisplayName2",
                    Role = "Admin"
                }
            };
        }
    }
}
