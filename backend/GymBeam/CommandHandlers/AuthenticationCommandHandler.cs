using GymBeam.Commands;
using GymBeam.Response;
using MediatR;

namespace GymBeam.CommandHandlers
{
    public class AuthenticationCommandHandler
        : IRequestHandler<RegisterCommand, UserResponse>
    {

        Task<UserResponse> IRequestHandler<RegisterCommand, UserResponse>.Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            return Task.FromResult<UserResponse>(new UserResponse { DisplayName = "abc"});
        }
    }
}
