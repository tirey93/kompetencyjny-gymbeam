using FluentValidation;

namespace GymBeam.Requests
{
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(LoginRequest => LoginRequest.Username)
                .NotEmpty().WithMessage("Username is required.")
                .MinimumLength(5).WithMessage("Username must be at least 5 characters long.")
                .MaximumLength(20).WithMessage("Username must not exceed 20 characters.");

            RuleFor(LoginRequest => LoginRequest.Password)
                .NotEmpty().WithMessage("Password is required.")
                .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
                .MaximumLength(20).WithMessage("Password must not exceed 20 characters.");
        }
    }
}