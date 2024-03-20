namespace GymBeam.Requests
{
    public class ReservationRequest
    {
        public int ActivityId { get; set; }
        public int UserId { get; set; }
        public DateTime StartTime { get; set; }
    }
}
