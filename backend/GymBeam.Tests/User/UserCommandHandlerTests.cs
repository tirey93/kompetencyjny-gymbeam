using Domain;
using Domain.Exceptions;
using FluentAssertions;
using GymBeam.CommandHandlers;
using GymBeam.Commands;
using Moq;
using System.Threading;

namespace GymBeam.Tests.User
{
    public class UserCommandHandlerTests
    {
        private readonly Mock<IRepository> _repositoryMock;
        private readonly Mock<Domain.User> _userMock;
        private readonly UserCommandHandler _userCommandHandler;
        private readonly CancellationTokenSource _cancellationTokenSource;

        public UserCommandHandlerTests()
        {
            _userMock = new Mock<Domain.User>();
            _repositoryMock = new Mock<IRepository>();
            _repositoryMock.Setup(x => x.GetUser(It.IsAny<int>())).Returns(_userMock.Object);

            _userCommandHandler = new UserCommandHandler(_repositoryMock.Object);
            _cancellationTokenSource = new CancellationTokenSource();
        }

        [Fact]
        public void UpdateUserRole_ShouldSucceed()
        {
            //Assign
            var newRole = Role.User.ToString();
            var userId = 43;

            var command = new UpdateUserRoleCommand
            {
                NewRole = newRole,
                UserId = userId
            };

            //Act
            _userCommandHandler.Handle(command, _cancellationTokenSource.Token);

            //Assert
            _repositoryMock.Verify(x => x.SaveChangesAsync(), Times.Once);
        }

        [Fact]
        public async void UpdateUserRole_WhenUserNotExists_ShouldThrowUserNotFoundException()
        {
            //Assign
            var newRole = Role.User.ToString();
            var userId = 43;

            var command = new UpdateUserRoleCommand
            {
                NewRole = newRole,
                UserId = userId
            };
            _repositoryMock.Setup(x => x.GetUser(It.IsAny<int>())).Returns((Domain.User) null);

            // Assert
            var act = _userCommandHandler.Invoking(async x => await x.Handle(command, _cancellationTokenSource.Token));
            await act.Should().ThrowExactlyAsync<UserNotFoundException>();
        }

        [Fact]
        public async Task UpdateUserRole_WhenRoleIncorrect_ShouldThrowArgumentException()
        {
            // Assign
            var newRole = "InvalidRole";
            var userId = 43;

            var command = new UpdateUserRoleCommand
            {
                NewRole = newRole,
                UserId = userId
            };

            // Assert
            var act = _userCommandHandler.Invoking(async x => await x.Handle(command, _cancellationTokenSource.Token));
            await act.Should().ThrowExactlyAsync<ArgumentException>();
        }
    }
}