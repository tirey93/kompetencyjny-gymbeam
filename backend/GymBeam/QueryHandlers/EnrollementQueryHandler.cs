using Domain;
using Domain.Exceptions;
using GymBeam.Constants;
using GymBeam.Exceptions;
using GymBeam.Queries;
using GymBeam.Responses;
using GymBeam.Utils;
using MediatR;

namespace GymBeam.QueryHandlers
{
    public class EnrollementQueryHandler : IRequestHandler<GetEnrollementsLoggedUserQuery, IEnumerable<EnrollmentResponse>>
    {
        private readonly IRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public EnrollementQueryHandler(IRepository repository, IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }


        public Task<IEnumerable<EnrollmentResponse>> Handle(GetEnrollementsLoggedUserQuery request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var reservations = _repository.GetReservations(x => x.User.Id == loggedUserId);

            var enrollements = _repository.GetEnrollments(reservations.Min(x => x.StartTime), reservations.Max(x => x.StartTime))
                .ToDictionary(x => new Enroll { ActivityId = x.ActivityId, StartTime = x.StartTime }, y => y.SlotsTaken);

            var result = reservations.Select(x => new EnrollmentResponse
            {
                ReservationId = x.Id,
                ActivityId = x.Activity.Id,
                LeaderId = x.Activity.Leader.Id,
                SlotsTaken = GetSlotsTaken(x, enrollements),
                TotalCapacity = x.Activity.TotalCapacity.Value,
                StartTime = x.StartTime,
                Duration = x.Activity.Duration.Value,
                Name = x.Activity.Name,
                ShortDescription = x.Activity.ShortDescription,
                LongDescription = x.Activity.LongDescription,
                LeaderName = x.Activity.Leader.Name,
            });

            return Task.FromResult(result);
        }

        private static int GetSlotsTaken(Reservation reservation, Dictionary<Enroll, int> enrolls)
        {
            if(enrolls.TryGetValue(new Enroll { ActivityId = reservation.Activity.Id, StartTime = reservation.StartTime }, out var res))
                return res;
            return 0;
        }

        private class Enroll
        {
            public int ActivityId { get; set; }
            public DateTime StartTime { get; set; }

            public override bool Equals(object obj)
            {
                if (obj == null || GetType() != obj.GetType())
                    return false;

                Enroll other = (Enroll)obj;
                return (ActivityId == other.ActivityId) && (StartTime.Equals(other.StartTime));
            }

            public override int GetHashCode()
            {
                unchecked
                {
                    int hash = 17;
                    hash = hash * 23 + ActivityId.GetHashCode();
                    hash = hash * 23 + StartTime.GetHashCode();
                    return hash;
                }
            }
        }

    }
}
