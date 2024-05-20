using GymBeam.Responses;
using MediatR;

namespace GymBeam.Queries
{
    public class GetEnrollementsLoggedUserQuery : IRequest<IEnumerable<EnrollmentResponse>>
    {
    }
}
