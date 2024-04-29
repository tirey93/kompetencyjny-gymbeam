using Domain;
using Domain.Exceptions;
using GymBeam.CommandHandlers;
using GymBeam.Commands;
using GymBeam.Queries;
using GymBeam.QueryHandlers;
using System;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace GymBeam.Tests.User
{
    public class UserQueryHandlerTests
    {
        private readonly Mock<IRepository> _repositoryMock;
        private readonly UserQueryHandler _userQueryHandler;
        private readonly CancellationTokenSource _cancellationTokenSource;

        public UserQueryHandlerTests()
        {
            _repositoryMock = new Mock<IRepository>();

            _userQueryHandler = new UserQueryHandler(_repositoryMock.Object);
            _cancellationTokenSource = new CancellationTokenSource();
        }

        [Fact]
        public async Task CheckUsernameAvailability_WhenAvailable_Null_ShouldReturnTrue()
        {
            //Arrange
            var username = "username1";
            var query = new CheckUsernameAvailabilityQuery
            {
                Username = username
            };
            _repositoryMock.Setup(x => x.GetUsers(It.IsAny<Func<Domain.User, bool>>())).Returns((List<Domain.User>) null);

            //Act
            var result = await _userQueryHandler.Handle(query, _cancellationTokenSource.Token);

            //Assert
            result.Should().BeTrue();
        }
        
        [Fact]
        public async Task CheckUsernameAvailability_WhenAvailable_Empty_ShouldReturnTrue()
        {
            //Arrange
            var username = "username1";
            var query = new CheckUsernameAvailabilityQuery
            {
                Username = username
            };
            _repositoryMock.Setup(x => x.GetUsers(It.IsAny<Func<Domain.User, bool>>())).Returns(new List<Domain.User>());

            //Act
            var result = await _userQueryHandler.Handle(query, _cancellationTokenSource.Token);

            //Assert
            result.Should().BeTrue();
        }

        [Fact]
        public async Task CheckUsernameAvailability_WhenNotAvailable_ShouldReturnFalse()
        {
            //Arrange
            var username = "username1";
            var query = new CheckUsernameAvailabilityQuery
            {
                Username = username
            };
            _repositoryMock.Setup(x => x.GetUsers(It.IsAny<Func<Domain.User, bool>>()))
                .Returns(new List<Domain.User>
                {
                    new Domain.User { Name = username }
                });

            //Act
            var result = await _userQueryHandler.Handle(query, _cancellationTokenSource.Token);

            //Assert
            result.Should().BeFalse();
        }

        [Fact]
        public async Task GetUser_ShouldReturnUserResponse()
        {
            //Arrange
            var user = new Domain.User
            {
                Id = 1,
                Name = "Test",
                DisplayName = "Test",
                ReservationDisabled = true,
                Role = Role.User
            };
            var query = new GetUserQuery
            {
                UserId = user.Id,
            };

            _repositoryMock.Setup(x => x.GetUser(It.IsAny<int>())).Returns(user);

            //Act
            var result = await _userQueryHandler.Handle(query, _cancellationTokenSource.Token);

            //Assert
            result.Should().NotBeNull();
            result.Id.Should().Be(user.Id);
            result.Name.Should().BeEquivalentTo(user.Name);
            result.DisplayName.Should().BeEquivalentTo(user.DisplayName);
            result.ReservationDisabled.Should().Be(user.ReservationDisabled);
            result.Role.Should().BeEquivalentTo(user.Role.ToString());
        }
        [Fact]
        public async Task GetUser_WhenUserNotExists_ShouldThrowUserNotFoundException()
        {
            //Arrange
            var query = new GetUserQuery
            {
                UserId = 58
            };

            _repositoryMock.Setup(x => x.GetUser(It.IsAny<int>())).Returns((Domain.User) null);

            //Assert
            var act = _userQueryHandler.Invoking(async x => await x.Handle(query, _cancellationTokenSource.Token));
            await act.Should().ThrowExactlyAsync<UserNotFoundException>();
        }

        [Fact]
        public async Task GetAllUser_ShouldReturnListUserResponse()
        {
            //Arrange
            var users = new List<Domain.User>
            {
                new Domain.User
                {
                    Id = 1,
                    Name = "Test",
                    DisplayName = "Test",
                    ReservationDisabled = true,
                    Role = Role.User
                },
                new Domain.User
                {
                    Id = 2,
                    Name = "Test2",
                    DisplayName = "Test2",
                    ReservationDisabled = false,
                    Role = Role.Admin
                }
            };

            var query = new GetAllUsersQuery();

            _repositoryMock.Setup(x => x.GetUsers(null)).Returns(users);

            //Act
            var result = await _userQueryHandler.Handle(query, _cancellationTokenSource.Token);

            //Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(users.Count);
            result.ToArray()[0].Id.Should().Be(users[0].Id);
            result.ToArray()[0].Name.Should().BeEquivalentTo(users[0].Name);
            result.ToArray()[0].DisplayName.Should().BeEquivalentTo(users[0].DisplayName);
            result.ToArray()[0].ReservationDisabled.Should().Be(users[0].ReservationDisabled);
            result.ToArray()[0].Role.Should().BeEquivalentTo(users[0].Role.ToString());

            result.ToArray()[1].Id.Should().Be(users[1].Id);
            result.ToArray()[1].Name.Should().BeEquivalentTo(users[1].Name);
            result.ToArray()[1].DisplayName.Should().BeEquivalentTo(users[1].DisplayName);
            result.ToArray()[1].ReservationDisabled.Should().Be(users[1].ReservationDisabled);
            result.ToArray()[1].Role.Should().BeEquivalentTo(users[1].Role.ToString());
        }

        [Fact]
        public async Task GetAllUser_WhenNull_ShouldReturnEmpty()
        {
            //Arrange
            var query = new GetAllUsersQuery();

            _repositoryMock.Setup(x => x.GetUsers(null)).Returns((List<Domain.User>) null);

            //Act
            var result = await _userQueryHandler.Handle(query, _cancellationTokenSource.Token);

            //Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(0);
        }

        [Fact]
        public async Task GetAllUser_WhenEmpty_ShouldReturnEmpty()
        {
            //Arrange
            var query = new GetAllUsersQuery();

            _repositoryMock.Setup(x => x.GetUsers(null)).Returns(new List<Domain.User>());

            //Act
            var result = await _userQueryHandler.Handle(query, _cancellationTokenSource.Token);

            //Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(0);
        }
    }
}