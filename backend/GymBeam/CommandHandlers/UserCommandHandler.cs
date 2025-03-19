using Domain;
using Domain.Exceptions;
using GymBeam.Commands;
using GymBeam.Utils;
using MediatR;
using Stripe;

namespace GymBeam.CommandHandlers
{
    public class UserCommandHandler : IRequestHandler<UpdateUserRoleCommand, Unit>,
                                      IRequestHandler<UpdateUserReservationDisabledFlagCommand, Unit>,
                                      IRequestHandler<DeleteUserCommand, Unit>,
                                      IRequestHandler<CreateSubscriptionUserCommand, string>,
                                      IRequestHandler<ChangeUserPasswordCommand, Unit>
    {
        private readonly IRepository _repository;
        private readonly PaymentIntentService _paymentIntentService;
        private readonly ILogger<UserCommandHandler> _logger;

        public UserCommandHandler(IRepository repository, PaymentIntentService paymentIntentService, ILogger<UserCommandHandler> logger)
        {
            _repository = repository;
            _paymentIntentService = paymentIntentService;
            _logger = logger;
        }

        public async Task<Unit> Handle(UpdateUserRoleCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUser(request.UserId) 
                ?? throw new UserNotFoundException(request.UserId);

            user.Role = Enum.Parse<Role>(request.NewRole);
            await _repository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(UpdateUserReservationDisabledFlagCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUser(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            user.ReservationDisabled = request.NewReservationDisabledFlagValue;
            await _repository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUser(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            _repository.Delete(user);
            await _repository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<string> Handle(CreateSubscriptionUserCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUser(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            var options = new PaymentIntentCreateOptions
            {
                Currency = "pln",
                Amount = 1099,
                AutomaticPaymentMethods = new()
                {
                    Enabled = true,
                }
            };

            var paymentIntent = await _paymentIntentService.CreateAsync(options);
            _logger.LogInformation($"Stripe: paymentIntent.Id:{paymentIntent.Id}");

            Domain.Subscription subscription = user.Subscription;
            if (subscription == null)
            {
                subscription = new Domain.Subscription(paymentIntent.Id);
                user.Subscription = subscription;
                _repository.Add(subscription);
            }
            else
            {
                user.Subscription.PaymentIntentId = paymentIntent.Id;
            }
            await _repository.SaveChangesAsync();

            return paymentIntent.ClientSecret;
        }

        public async Task<Unit> Handle(ChangeUserPasswordCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUser(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            var oldPasswordHash = ShaHelper.QuickHash(request.OldPassword);
            if (oldPasswordHash.ToLower() != user.HashedPassword.ToLower())
                throw new PasswordNotMatchException(user.Name);

            var newPasswordHash = ShaHelper.QuickHash(request.NewPassword);

            user.HashedPassword = newPasswordHash;
            await _repository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
