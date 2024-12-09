using MediatR;

namespace GymBeam.Commands
{
    public class UpdateSubscriptionWebhookCommand : IRequest<Unit>
    {
        public string PaymentIntentId { get; set; }
    }
}
