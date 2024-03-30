using Domain;
using GymBeam.Queries;
using GymBeam.Response;
using MediatR;

namespace GymBeam.QueryHandlers
{
    public class CheckUsernameAvailabilityQueryHandler : IRequestHandler<CheckUsernameAvailabilityQuery, bool>
    {
        private readonly IRepository _repository;

        public CheckUsernameAvailabilityQueryHandler(IRepository repository)
        {
            _repository = repository;
        }

        public Task<bool> Handle(CheckUsernameAvailabilityQuery request, CancellationToken cancellationToken)
        {
            bool result = _repository.isUsernameAvailable(request.Username);

            return Task.FromResult(result);
        }
    }
}
