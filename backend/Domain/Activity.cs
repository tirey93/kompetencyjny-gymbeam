using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Activity
    {
        [Key]
        public int Id { get; set; }
        public int Duration { get; set; }
        public int TotalCapacity { get; set; }
        public User Leader { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        [Required]
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        [Required]
        public string Cron { get; set; }
    }
}
