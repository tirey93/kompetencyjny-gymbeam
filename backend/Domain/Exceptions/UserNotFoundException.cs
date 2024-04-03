using Domain.Properties;

namespace Domain.Exceptions
{
    public class UserNotFoundException : DomainException
    {
        public UserNotFoundException(int userId) : base(string.Format(Resource.ExceptionUserNotFound, userId)) 
        {
        }
    }
}
