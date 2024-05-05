using FluentValidation;
using GymBeam.Properties;

namespace GymBeam.Requests
{
    public class ReservationRequest
    {
        public int ActivityId { get; set; }
        public int UserId { get; set; }
        public DateTime StartTime { get; set; }
    }

    public class ReservationRequestValidator : AbstractValidator<ReservationRequest>
    {
        public ReservationRequestValidator()
        {
            RuleFor(reservationRequest => reservationRequest.ActivityId)
                .NotEmpty().WithMessage(Resource.ValidatorActivityIdRequired);

            RuleFor(reservationRequest => reservationRequest.UserId)
                .NotEmpty().WithMessage(Resource.ValidatorUserIdRequired);

            RuleFor(reservationRequest => reservationRequest.StartTime)
                .NotEmpty().WithMessage(Resource.ValidatorStartTimeRequired);
        }
    }
}
