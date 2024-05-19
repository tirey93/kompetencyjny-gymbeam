using Domain;
using Domain.Exceptions;
using GymBeam.Queries;
using GymBeam.QueryHandlers;
using GymBeam.Utils;

namespace GymBeam.Tests.Authentication
{
    public class AuthenticationQueryHandlerTests
    {
        private readonly Mock<IRepository> _repositoryMock;
        private readonly AuthenticationQueryHandler _authenticationQueryHandler;
        private readonly CancellationTokenSource _cancellationTokenSource;
        private readonly string _password;
        private readonly string _hashedPassword;

        public AuthenticationQueryHandlerTests()
        {
            _repositoryMock = new Mock<IRepository>();

            _authenticationQueryHandler = new AuthenticationQueryHandler(_repositoryMock.Object);
            _cancellationTokenSource = new CancellationTokenSource();

            _password = "password";
            _hashedPassword = ShaHelper.QuickHash(_password);
        }

        [Fact]
        public async Task Login_ShouldReturnUserResponse()
        {
            //Arrange
            var username = "Test";
            var user = new Domain.User
            {
                Id = 1,
                Name = username,
                DisplayName = "Test",
                ReservationDisabled = true,
                Role = Role.User,
                HashedPassword = _hashedPassword
            };
            var query = new LoginQuery
            {
                Username = username,
                Password = _password
            };

            _repositoryMock.Setup(x => x.GetUsers(It.IsAny<Func<Domain.User, bool>>())).Returns(new List<Domain.User> { user });

            //Act
            var result = await _authenticationQueryHandler.Handle(query, _cancellationTokenSource.Token);

            //Assert
            result.Should().NotBeNull();
            result.Id.Should().Be(user.Id);
            result.Name.Should().BeEquivalentTo(user.Name);
            result.DisplayName.Should().BeEquivalentTo(user.DisplayName);
            result.ReservationDisabled.Should().Be(user.ReservationDisabled);
            result.Role.Should().BeEquivalentTo(user.Role.ToString());
        }

        [Fact]
        public async Task Login_WhenUserNotFound_ShouldThrowUserNotFoundException()
        {
            //Arrange
            var username = "Test";
            var user = new Domain.User
            {
                Id = 1,
                Name = username,
                DisplayName = "Test",
                ReservationDisabled = true,
                Role = Role.User,
                HashedPassword = _hashedPassword
            };
            var query = new LoginQuery
            {
                Username = username,
                Password = _password
            };

            _repositoryMock.Setup(x => x.GetUsers(It.IsAny<Func<Domain.User, bool>>())).Returns(new List<Domain.User>());

            //Assert
            var act = _authenticationQueryHandler.Invoking(async x => await x.Handle(query, _cancellationTokenSource.Token));
            await act.Should().ThrowExactlyAsync<UserNotFoundException>();
        }

        [Fact]
        public async Task Login_WhenPasswordIsWrong_ShouldThrowUserNotFoundException()
        {
            //Arrange
            var username = "Test";
            var user = new Domain.User
            {
                Id = 1,
                Name = username,
                DisplayName = "Test",
                ReservationDisabled = true,
                Role = Role.User,
                HashedPassword = _hashedPassword
            };
            var query = new LoginQuery
            {
                Username = username,
                Password = "wrong_password"
            };

            _repositoryMock.Setup(x => x.GetUsers(It.IsAny<Func<Domain.User, bool>>())).Returns(new List<Domain.User> { user });

            //Assert
            var act = _authenticationQueryHandler.Invoking(async x => await x.Handle(query, _cancellationTokenSource.Token));
            await act.Should().ThrowExactlyAsync<PasswordNotMatchException>();
        }
    }
}