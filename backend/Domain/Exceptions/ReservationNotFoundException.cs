using Domain.Properties;

namespace Domain.Exceptions
{
    public class ReservationNotFoundException : DomainException
    {
        public ReservationNotFoundException(int reservationId) : base(string.Format(Resource.ExceptionReservationNotFound, reservationId)) 
        {
        }
    }
}
