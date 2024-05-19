using FluentValidation;
using GymBeam.Properties;
using GymBeam.Responses;
using MediatR;

namespace GymBeam.Queries
{
    public class GetEnrollmentsByDatesQuery : IRequest<List<EnrollmentResponse>>
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
    }

    public class GetEnrollmentsByDatesQueryValidator : AbstractValidator<GetEnrollmentsByDatesQuery>
    {
        public GetEnrollmentsByDatesQueryValidator()
        {
            RuleFor(enrollmentQuery => enrollmentQuery.From)
                .LessThan(enrollmentQuery => enrollmentQuery.To)
                .WithMessage(Resource.ValidatorStartTimeBeforeEndTime);

            RuleFor(enrollmentQuery => enrollmentQuery.To)
                .LessThan(enrollmentQuery => enrollmentQuery.From.AddDays(7).AddSeconds(1))
                .WithMessage(Resource.ValidatorEnrollmentRangeExceeded);
        }
    }
}
