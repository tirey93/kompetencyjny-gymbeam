using Domain;
using Domain.Exceptions;
using GymBeam.Constants;
using GymBeam.Exceptions;
using GymBeam.Queries;
using GymBeam.Responses;
using GymBeam.Utils;
using MediatR;
using NCrontab;
using System.Diagnostics;

namespace GymBeam.QueryHandlers
{
    public class EnrollementQueryHandler : IRequestHandler<GetEnrollementsLoggedUserQuery, IEnumerable<EnrollmentResponse>>,
                                            IRequestHandler<GetEnrollmentsByDatesQuery, List<EnrollmentResponse>>
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

            var enrollements = _repository.GetSlotsTakenForEnrollments(reservations.Min(x => x.StartTime), reservations.Max(x => x.StartTime));

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

        public Task<List<EnrollmentResponse>> Handle(GetEnrollmentsByDatesQuery request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor);

            var activities = _repository.GetActivities(x => x.StartTime <= request.To && x.EndTime >= request.From);

            var enrollments = _repository.GetSlotsTakenForEnrollments(request.From, request.To);


            var result = new List<EnrollmentResponse>();
            foreach (var activity in activities)
            {
                Dictionary<DateTime, int> reservations = null;
                if (loggedUserId != null)
                {
                   reservations = _repository
                        .GetReservations(x => x.Activity == activity && x.User.Id == loggedUserId.Value)
                        .ToDictionary(x => x.StartTime, y => y.Id);
                }

                var schedule = CrontabSchedule.Parse(activity.Cron);
                var startDates = schedule.GetNextOccurrences(request.From.AddSeconds(-1), request.To.AddSeconds(1));

                foreach (var startDate in startDates)
                {
                    enrollments.TryGetValue(new Enrollment { ActivityId = activity.Id, StartTime = startDate }, out var slotsTaken);

                    result.Add(new EnrollmentResponse
                    {
                        ReservationId = GetReservationId(startDate, reservations),
                        ActivityId = activity.Id,
                        LeaderId = activity.Leader.Id,
                        SlotsTaken = slotsTaken,
                        TotalCapacity = activity.TotalCapacity.Value,
                        StartTime = startDate,
                        Duration = activity.Duration.Value,
                        Name = activity.Name,
                        ShortDescription = activity.ShortDescription,
                        LongDescription = activity.LongDescription,
                        LeaderName = activity.Leader.Name,
                    });
                }
            }

            return Task.FromResult(result);
        }

        private static int GetSlotsTaken(Reservation reservation, Dictionary<Enrollment, int> enrollments)
        {
            if(enrollments.TryGetValue(new Enrollment { ActivityId = reservation.Activity.Id, StartTime = reservation.StartTime }, out var res))
                return res;
            return 0;
        }
        
        private static int? GetReservationId(DateTime startTime, Dictionary<DateTime, int> reservations)
        {
            if (reservations == null)
                return null;
            if (reservations.TryGetValue(startTime, out var res))
                return res;
            return null;

        }
    }
}
