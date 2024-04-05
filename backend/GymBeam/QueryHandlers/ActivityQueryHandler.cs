using Domain;
using GymBeam.Queries;
using GymBeam.Responses;
using MediatR;

namespace GymBeam.QueryHandlers
{
    public class ActivityQueryHandler : IRequestHandler<GetAllActivitiesQuery, IEnumerable<ActivityResponse>>
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
    }
}
