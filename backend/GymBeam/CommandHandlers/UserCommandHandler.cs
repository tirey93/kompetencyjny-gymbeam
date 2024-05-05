﻿using Domain;
using Domain.Exceptions;
using GymBeam.Commands;
using GymBeam.Exceptions;
using MediatR;

namespace GymBeam.CommandHandlers
{
    public class UserCommandHandler : IRequestHandler<UpdateUserRoleCommand, Unit>,
                                      IRequestHandler<UpdateUserReservationDisabledFlagCommand, Unit>,
                                      IRequestHandler<DeleteUserCommand, Unit>
    {
        private readonly IRepository _repository;

        public UserCommandHandler(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(UpdateUserRoleCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUser(request.UserId) 
                ?? throw new UserNotFoundException(request.UserId);

            user.Role = Enum.Parse<Role>(request.NewRole);
            await _repository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(UpdateUserReservationDisabledFlagCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUser(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            user.ReservationDisabled = request.NewReservationDisabledFlagValue;
            await _repository.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUser(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            _repository.Delete(user);
            await _repository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
