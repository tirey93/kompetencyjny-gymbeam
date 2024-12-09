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
    }
}
