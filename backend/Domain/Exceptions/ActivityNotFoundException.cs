using Domain.Properties;

namespace Domain.Exceptions
{
    public class ActivityNotFoundException : DomainException
    {
        public ActivityNotFoundException(int activityId) : base(string.Format(Resource.ExceptionActivityNotFound, activityId)) 
        {
        }
    }
}
