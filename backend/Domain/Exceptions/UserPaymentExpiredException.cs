using Domain.Properties;

namespace Domain.Exceptions
{
    public class UserPaymentExpiredException : DomainException
    {
        public UserPaymentExpiredException(int id, DateTime expiredAt) 
            : base(string.Format(Resource.UserPaymentUnsucceed, id, expiredAt.ToShortDateString())) 
        {
        }
    }
}
