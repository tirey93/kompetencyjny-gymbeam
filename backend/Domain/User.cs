using Domain.Exceptions;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public Role Role { get; set; }
        public string HashedPassword { get; set; }
        public bool ReservationDisabled { get; set; }
        public Subscription Subscription { get; set; }

        public bool SubscriptionIsActive => Subscription != null 
            && Subscription.Succeeded 
            && (!Subscription.HasExpired || Subscription.IsPrivileged);

        public bool HasValidSubscription()
        {
            if (Subscription == null) 
                throw new UserDoesntHaveSubscriptionException(Id);

            if (Subscription.IsPrivileged) 
                return true;

            if (!Subscription.Succeeded)
                throw new UserPaymentUnsucceedException(Id);
            if (Subscription.HasExpired)
                throw new UserPaymentExpiredException(Id, Subscription.ExpiresAt.Value);

            return true;
        }
    }
}
