﻿using MediatR;

namespace GymBeam.Commands
{
    public class UpdateActivityCommand : IRequest<Unit>
    {
        public int ActivityId { get; set; }
        public int? Duration { get; set; }
        public int? TotalCapacity { get; set; }
        public int? LeaderId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public string Cron { get; set; }
    }
}
