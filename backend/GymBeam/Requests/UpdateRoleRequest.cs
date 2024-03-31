using FluentValidation;
using GymBeam.Commands;

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
                    return $"Role must be one of: {rolesList}";
                });
        }
    }
}
