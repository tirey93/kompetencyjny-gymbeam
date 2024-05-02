using Domain;
using Domain.Exceptions;
using GymBeam.CommandHandlers;
using GymBeam.Commands;
using GymBeam.Queries;
using GymBeam.QueryHandlers;
using GymBeam.Utils;
using System;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace GymBeam.Tests.Authentication
{
    public class AuthenticationCommandHandlerTests
    {
        private readonly Mock<IRepository> _repositoryMock;
        private readonly AuthenticationCommandHandler _authenticationCommandHandler;
        private readonly CancellationTokenSource _cancellationTokenSource;
        private readonly string _password;
        private readonly string _hashedPassword;

        public AuthenticationCommandHandlerTests()
        {
            _repositoryMock = new Mock<IRepository>();

            _authenticationCommandHandler = new AuthenticationCommandHandler(_repositoryMock.Object);
            _cancellationTokenSource = new CancellationTokenSource();

            _password = "password";
            _hashedPassword = ShaHelper.QuickHash(_password);
        }

        [Fact]
        public async Task Register_ShouldReturnUserResponse()
        {
            //Arrange
            var username = "Test";
            var displayName = "DisplayName1";
            string hashedPassword = null;

            var command = new RegisterCommand
            {
                Username = username,
                Password = _password,
                DisplayName = displayName
            };

            _repositoryMock.Setup(x => x.GetUsers(It.IsAny<Func<Domain.User, bool>>())).Returns(new List<Domain.User>());
            _repositoryMock.Setup(x => x.Add(It.IsAny<Domain.User>())).Callback((Domain.User user) =>
            {
                hashedPassword = user.HashedPassword;
            });

            //Act
            var result = await _authenticationCommandHandler.Handle(command, _cancellationTokenSource.Token);

            //Assert
            _repositoryMock.Verify(x => x.Add(It.IsAny<Domain.User>()), Times.Once);
            _repositoryMock.Verify(x => x.SaveChangesAsync(), Times.Once);

            result.Should().NotBeNull();
            result.Name.Should().BeEquivalentTo(username);
            result.DisplayName.Should().BeEquivalentTo(displayName);
            result.ReservationDisabled.Should().Be(false);
            result.Role.Should().BeEquivalentTo(Domain.Role.User.ToString());

            hashedPassword.Should().BeEquivalentTo(_hashedPassword);
        }

        [Fact]
        public async Task Register_WhenUserExists_ShouldThrowUserAlreadyExistsException()
        {
            //Arrange
            var username = "Test";
            var displayName = "DisplayName1";

            var command = new RegisterCommand
            {
                Username = username,
                Password = _password,
                DisplayName = displayName
            };

            _repositoryMock.Setup(x => x.GetUsers(It.IsAny<Func<Domain.User, bool>>())).Returns(new List<Domain.User> { new Domain.User { Id = 1} });

            //Assert
            var act = _authenticationCommandHandler.Invoking(async x => await x.Handle(command, _cancellationTokenSource.Token));
            await act.Should().ThrowExactlyAsync<UserAlreadyExistsException>();
        }
    }
}