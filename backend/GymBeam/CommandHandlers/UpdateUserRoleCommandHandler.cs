using Domain;
using GymBeam.Commands;
using GymBeam.Exceptions;
using MediatR;

namespace GymBeam.CommandHandlers
{
    public class UpdateUserRoleCommandHandler : IRequestHandler<UpdateUserRoleCommand, Unit>
    {
        private readonly IRepository _repository;

        public UpdateUserRoleCommandHandler(IRepository repository)
        {
            _repository = repository;
        }

        public Task<Unit> Handle(UpdateUserRoleCommand request, CancellationToken cancellationToken)
        {
            User user;
            try
            {
                user = _repository.GetById<User>(request.UserId);
                user.Role = request.NewRole;
                _repository.SaveChangesAsync();
                return Task.FromResult(Unit.Value);
            }
            catch (Exception)
            {
                throw new InvalidUserIdException();
            }
        }
    }
}
