using Domain.Properties;

namespace Domain.Exceptions
{
    public class UserPaymentUnsucceedException : DomainException
    {
        public UserPaymentUnsucceedException(int id) : base(string.Format(Resource.UserPaymentUnsucceed, id)) 
        {
        }
    }
}
