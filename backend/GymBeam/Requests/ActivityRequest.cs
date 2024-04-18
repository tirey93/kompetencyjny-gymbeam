using FluentValidation;
using GymBeam.Properties;

namespace GymBeam.Requests
{
    public class ActivityRequest
    {
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
    public class ActivityRequestValidator : AbstractValidator<ActivityRequest>
    {
        public ActivityRequestValidator()
        {
            RuleFor(activityRequest => activityRequest.Duration)
                .GreaterThan(0)
                .When(x => x.Duration.HasValue)
                .WithMessage(Resource.ValidatorDurationGreaterThanZero);

            RuleFor(activityRequest => activityRequest.TotalCapacity)
                .GreaterThan(0)
                .When(x => x.TotalCapacity.HasValue)
                .WithMessage(Resource.ValidatorTotalCapacityGreaterThanZero);

            RuleFor(activityRequest => activityRequest.StartTime)
                .LessThan(activityRequest => activityRequest.EndTime)
                .When(x => x.StartTime.HasValue)
                .WithMessage(Resource.ValidatorStartTimeBeforeEndTime);

            RuleFor(activityRequest => activityRequest.EndTime)
                .GreaterThan(activityRequest => activityRequest.StartTime)
                .When(x => x.EndTime.HasValue)
                .WithMessage(Resource.ValidatorEndTimeAfterStartTime);

            RuleFor(activityRequest => activityRequest.Name)
                .NotEmpty().WithMessage(Resource.ValidatorNameRequired)
                .MaximumLength(255).WithMessage(Resource.ValidatorNameShorter);

            RuleFor(activityRequest => activityRequest.ShortDescription)
                .MaximumLength(1000).WithMessage(Resource.ValidatorShortDescriptionShorter);

            RuleFor(activityRequest => activityRequest.LongDescription)
                .MaximumLength(4000).WithMessage(Resource.ValidatorLongDescriptionShorter);

            RuleFor(activityRequest => activityRequest.Cron)
                .NotEmpty().WithMessage(Resource.ValidatorCronRequired)
                .MaximumLength(255).WithMessage(Resource.ValidatorCronShorter);
        }
    }
}
