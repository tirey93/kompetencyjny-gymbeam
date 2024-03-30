using FluentValidation;

namespace GymBeam.Requests
{
    public class RegisterRequest
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
    }

    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            RuleFor(registerRequest => registerRequest.Username)
                .NotEmpty().WithMessage("Username is required.")
                .MinimumLength(5).WithMessage("Username must be at least 5 characters long.")
                .MaximumLength(20).WithMessage("Username must not exceed 20 characters.");

            RuleFor(registerRequest => registerRequest.DisplayName)
                .NotEmpty().WithMessage("Display name is required.")
                .MinimumLength(5).WithMessage("Display name must be at least 5 characters long.")
                .MaximumLength(20).WithMessage("Display name must not exceed 20 characters.");

            RuleFor(registerRequest => registerRequest.Password)
                .NotEmpty().WithMessage("Password is required.")
                .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
                .MaximumLength(255).WithMessage("Password must not exceed 255 characters.");
        }
    }
}