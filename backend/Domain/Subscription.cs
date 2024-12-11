using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Subscription
    {
        [Key]
        public int Id { get; set; }
        public string PaymentIntentId { get; set; }
        public bool Succeeded { get; set; }
        public DateTime? ExpiresAt { get; set; }

        public bool IsPrivileged => Succeeded && ExpiresAt == null;
        public bool HasExpired => ExpiresAt < DateTime.UtcNow;

        public Subscription(string paymentIntentId)
        {
            PaymentIntentId = paymentIntentId;
        }
    }
}
