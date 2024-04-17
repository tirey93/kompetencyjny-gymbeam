using GymBeam.Response;
using MediatR;
namespace GymBeam.Queries
{
    public class CheckUsernameAvailabilityQuery : IRequest<bool>
    {
        public string Username { get; set; }
    }
}
