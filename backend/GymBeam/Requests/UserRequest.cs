﻿namespace GymBeam.Requests
{
    public class UserRequest
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
        public bool ReservationDisabled { get; set; }
    }
}
