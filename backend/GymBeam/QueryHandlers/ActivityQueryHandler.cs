using Domain;
using Domain.Exceptions;
using GymBeam.Queries;
using GymBeam.Responses;
using MediatR;

namespace GymBeam.QueryHandlers
{
    public class ActivityQueryHandler : IRequestHandler<GetAllActivitiesQuery, IEnumerable<ActivityResponse>>,
                                        IRequestHandler<GetActivityQuery, ActivityResponse>
    {
        private readonly IRepository _repository;

        public ActivityQueryHandler(IRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<ActivityResponse>> Handle(GetAllActivitiesQuery request, CancellationToken cancellationToken)
        {
            var activities = _repository.GetActivities();

            if (activities == null || !activities.Any())
            {
                return Task.FromResult(Enumerable.Empty<ActivityResponse>());
            }

            var result = activities.Select(x => new ActivityResponse
            {
                Id = x.Id,
                Duration = x.Duration,
                TotalCapacity = x.TotalCapacity,
                LeaderId = x.Leader?.Id,
                StartTime = x.StartTime,
                EndTime = x.EndTime,
                Name = x.Name,
                ShortDescription = x.ShortDescription, 
                LongDescription = x.LongDescription,
                Cron = x.Cron,
                LeaderName = x.Leader?.Name
            }).ToList();

            return Task.FromResult<IEnumerable<ActivityResponse>>(result);
        }

        public Task<ActivityResponse> Handle(GetActivityQuery request, CancellationToken cancellationToken)
        {
            var activity = _repository.GetActivity(request.ActivityId)
                ?? throw new ActivityNotFoundException(request.ActivityId);

            var result = new ActivityResponse
            {
                Id = activity.Id,
                Duration = activity.Duration,
                TotalCapacity = activity.TotalCapacity,
                LeaderId = activity.Leader?.Id,
                StartTime = activity.StartTime,
                EndTime = activity.EndTime,
                Name = activity.Name,
                ShortDescription = activity.ShortDescription,
                LongDescription = activity.LongDescription,
                Cron = activity.Cron,
                LeaderName = activity.Leader?.Name
            };
            return Task.FromResult(result);
        }
    }
}
