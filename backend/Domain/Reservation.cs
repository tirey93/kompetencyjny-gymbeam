using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Reservation
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public Activity Activity { get; set; }
        [Required]
        public User User { get; set; }
        [Required]
        public DateTime StartTime { get; set; }
    }
}
