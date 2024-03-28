using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
        public bool ReservationDisabled { get; set; }
        public DateTime testDate { get; set; }
    }
}
