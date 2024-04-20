using Domain;
using Domain.Exceptions;
using GymBeam.Commands;
using MediatR;

namespace GymBeam.CommandHandlers
{
    public class ActivityCommandHandler : IRequestHandler<CreateActivityCommand, Unit>,
                                          IRequestHandler<DeleteActivityCommand, Unit>
    {
        private readonly IRepository _repository;

        public ActivityCommandHandler(IRepository repository)
        {
            _repository = repository;
        }

        public Task<Unit> Handle(CreateActivityCommand request, CancellationToken cancellationToken)
        {
            User leader = null;

            if(request.LeaderId.HasValue)
            {
                leader = _repository.GetUser(request.LeaderId.Value)
                    ?? throw new UserNotFoundException(request.LeaderId.Value);
            }

            var activity = new Activity
            {
                Duration = request.Duration,
                TotalCapacity = request.TotalCapacity,
                Leader = leader,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                Name = request.Name,
                ShortDescription = request.ShortDescription,
                LongDescription = request.LongDescription,
                Cron = request.Cron
            };

            _repository.Add(activity);
            _repository.SaveChangesAsync();

            return Task.FromResult(Unit.Value);
        }

        public Task<Unit> Handle(DeleteActivityCommand request, CancellationToken cancellationToken)
        {
            var activity = _repository.GetActivity(request.ActivityId)
                ?? throw new ActivityNotFoundException(request.ActivityId);

            _repository.Delete(activity);
            _repository.SaveChangesAsync();

            return Task.FromResult(Unit.Value);
        }
    }
}
