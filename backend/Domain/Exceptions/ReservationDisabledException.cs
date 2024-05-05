using Domain.Properties;

namespace Domain.Exceptions
{
    public class ReservationDisabledException : DomainException
    {
        public ReservationDisabledException(int userId) : base(string.Format(Resource.ExceptionUserHasReservationDisabled, userId)) 
        {
        }
    }
}
