using Domain.Properties;

namespace Domain.Exceptions
{
    public class UserDoesntHaveSubscriptionException : DomainException
    {
        public UserDoesntHaveSubscriptionException(int id) : base(string.Format(Resource.UserDoesntHaveSubscription, id)) 
        {
        }
    }
}
