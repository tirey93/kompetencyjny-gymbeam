﻿namespace GymBeam.Response
{
    public class UserResponse
    {
        public int Id { get;  set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Role { get; set; }
        public bool ReservationDisabled { get; set; }
    }
}