using Domain;
using Domain.Exceptions;
using GymBeam.Commands;
using MediatR;

namespace GymBeam.CommandHandlers
{
    public class WebhookCommandHandler : IRequestHandler<UpdateSubscriptionWebhookCommand, Unit>
    {
        private readonly IRepository _repository;

        public WebhookCommandHandler(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(UpdateSubscriptionWebhookCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUserByPaymentId(request.PaymentIntentId)
                ?? throw new UserNotFoundException();

            user.Subscription.ExpiresAt = DateTime.UtcNow.AddMonths(1);
            user.Subscription.Succeeded = true;

            await _repository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
