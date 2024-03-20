namespace GymBeam.Responses
{
    public class ActivityResponse
    {
        public int Id { get; set; }
        public int Duration { get; set; }
        public int TotalCapacity { get; set; }
        public int LeaderId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public string Cron { get; set; }
        public string LeaderName { get; set; }
    }
}
