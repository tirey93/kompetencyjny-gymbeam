namespace GymBeam.Responses
{
    public class EnrollmentResponse
    {
        public int ActivityId { get; set; }
        public int LeaderId { get; set; }
        public int SlotsTaken { get; set; }
        public int TotalCapacity { get; set; }
        public DateTime StartTime { get; set; }
        public int Duration { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public string LeaderName { get; set; }
    }
}
