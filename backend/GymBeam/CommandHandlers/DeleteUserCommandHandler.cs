using Domain;
using GymBeam.Commands;
using GymBeam.Exceptions;
using MediatR;

namespace GymBeam.CommandHandlers
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Unit>
    {
        private readonly IRepository _repository;

        public DeleteUserCommandHandler(IRepository repository)
        {
            _repository = repository;
        }

        public Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            User user;
            try
            {
                user = _repository.GetById<User>(request.UserId);
                _repository.Delete(user);
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
