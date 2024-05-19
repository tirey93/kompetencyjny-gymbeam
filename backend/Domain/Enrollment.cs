
namespace Domain
{
    public class Enrollment
    {
        public int ActivityId { get; set; }
        public DateTime StartTime { get; set; }

        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
                return false;

            Enrollment other = (Enrollment)obj;
            return (ActivityId == other.ActivityId) && (StartTime.Equals(other.StartTime));
        }

        public override int GetHashCode()
        {
            unchecked
            {
                int hash = 17;
                hash = hash * 23 + ActivityId.GetHashCode();
                hash = hash * 23 + StartTime.GetHashCode();
                return hash;
            }
        }
    }
}