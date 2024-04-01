using FluentValidation;
using GymBeam.Properties;

namespace GymBeam.Requests
{
    public class UpdateRoleRequest
    {
        public string NewRole { get; set; }
    }

    public class UpdateRoleRequestValidator : AbstractValidator<UpdateRoleRequest>
    {
        public UpdateRoleRequestValidator()
        {
            RuleFor(x => x.NewRole)
                .Must(role => Enum.TryParse<Domain.Roles>(role, out _))
                .WithMessage(context =>
                {
                    var rolesList = string.Join(", ", Enum.GetNames(typeof(Domain.Roles)));
                    return string.Format(Resource.ValidatorRoleFromRolesList, rolesList);
                });
        }
    }
}
