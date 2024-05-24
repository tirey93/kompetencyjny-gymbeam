using Domain;
using Domain.Exceptions;
using GymBeam.CommandHandlers;
using GymBeam.Commands;
using GymBeam.Constants;
using GymBeam.Exceptions;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace GymBeam.Tests.Reservation
{
    public class ReservationCommandHandlerTests
    {
        private readonly Mock<IRepository> _repositoryMock;
        private readonly Mock<IHttpContextAccessor> _httpAccessorMock;
        private readonly ReservationCommandHandler _reservationCommandHandler;
        private readonly CancellationTokenSource _cancellationTokenSource;

        public ReservationCommandHandlerTests()
        {
            _repositoryMock = new Mock<IRepository>();
            _httpAccessorMock = new Mock<IHttpContextAccessor>();
            _reservationCommandHandler = new ReservationCommandHandler(_repositoryMock.Object, _httpAccessorMock.Object);
            _cancellationTokenSource = new CancellationTokenSource();
        }

        [Fact]
        public async Task Delete_ShouldSucceed()
        {
            // Arrange
            SetupHttpAccessor("2");
            var reservation = new Domain.Reservation
            {
                Id = 5,
                User = new Domain.User
                {
                    Id = 2,
                    Name = "UserName2",
                    DisplayName = "UserDisplayName2"
                },
                Activity = new Domain.Activity
                {
                    Id = 3,
                    Leader = new Domain.User
                    {
                        Id = 3,
                        Name = "LeaderName"
                    },
                    TotalCapacity = 25,
                    Duration = 40,
                    Name = "Powerlifting",
                    ShortDescription = "Short training",
                    LongDescription = "Long Training"
                },
                StartTime = new DateTime(2024, 10, 25, 16, 0, 0)
            };

            _repositoryMock.Setup(x => x.GetReservation(reservation.Id)).Returns(reservation);

            var command = new DeleteReservationCommand { ReservationId = reservation.Id };

            // Act
            await _reservationCommandHandler.Handle(command, _cancellationTokenSource.Token);

            // Assert
            _repositoryMock.Verify(x => x.SaveChangesAsync(), Times.Once);
            _repositoryMock.Verify(x => x.Delete(It.Is<Domain.Reservation>(r => r.Id == reservation.Id)), Times.Once);
        }

        [Fact]
        public async Task Delete_ShouldThrowReservationNotFoundException_WhenReservationNotFound()
        {
            // Arrange
            var reservationId = 15;
            _repositoryMock.Setup(x => x.GetReservation(reservationId)).Returns((Domain.Reservation)null);

            var request = new DeleteReservationCommand { ReservationId = reservationId };

            // Act
            Func<Task> act = async () => await _reservationCommandHandler.Handle(request, _cancellationTokenSource.Token);

            // Assert
            await act.Should().ThrowAsync<ReservationNotFoundException>();
        }

        [Fact]
        public async Task Delete_ShouldThrowAuthenticationFailureException_WhenUserNotAllowed()
        {
            // Arrange
            SetupHttpAccessor("1"); // Current user ID
            var reservationId = 15;
            var reservation = new Domain.Reservation
            {
                Id = reservationId,
                User = new Domain.User { Id = 2 }  // Different user ID
            };

            _repositoryMock.Setup(x => x.GetReservation(reservationId)).Returns(reservation);

            var request = new DeleteReservationCommand { ReservationId = reservationId };

            // Act
            Func<Task> act = async () => await _reservationCommandHandler.Handle(request, _cancellationTokenSource.Token);

            // Assert
            await act.Should().ThrowAsync<AuthenticationFailureException>();
        }

        [Fact]
        public async Task CreateReservation_ShouldThrowInvalidCookieException_WhenInvalidCookie()
        {
            SetupHttpAccessor("InvalidCookie");
            // Arrange
            var command = new CreateReservationCommand
            {
                ActivityId = 4,
                UserId = 1,
                StartTime = DateTime.Now
            };

            var user = new Domain.User
            {
                Id = 1,
                Name = "userName"
            };

            var activity = new Domain.Activity
            {
                Id = 4,
                Duration = 40,
                TotalCapacity = 20,
                StartTime = DateTime.Now.AddDays(2),
                EndTime = DateTime.Now.AddDays(31),
                Name = "Boks",
                ShortDescription = "Short test description.",
                LongDescription = "Looooooooooooooong test description.",
                Cron = "0 15 * * TUE",
            };

            _repositoryMock.Setup(x => x.GetUser(It.IsAny<int>())).Returns(user);
            _repositoryMock.Setup(x => x.GetActivity(It.IsAny<int>())).Returns(activity);

            // Act
            var act = _reservationCommandHandler.Invoking(async x => await x.Handle(command, _cancellationTokenSource.Token));

            //Assert
            await act.Should().ThrowExactlyAsync<InvalidCookieException>();
        }

        [Fact]
        public async Task CreateReservation_ShouldThrowUserNotFoundException_WhenNoUser()
        {
            SetupHttpAccessor("1");
            // Arrange
            var command = new CreateReservationCommand
            {
                ActivityId = 4,
                UserId = 1,
                StartTime = DateTime.Now
            };

            var activity = new Domain.Activity
            {
                Id = 4,
                Duration = 40,
                TotalCapacity = 20,
                StartTime = DateTime.Now.AddDays(2),
                EndTime = DateTime.Now.AddDays(31),
                Name = "Boks",
                ShortDescription = "Short test description.",
                LongDescription = "Looooooooooooooong test description.",
                Cron = "0 15 * * TUE",
            };

            _repositoryMock.Setup(x => x.GetActivity(It.IsAny<int>())).Returns(activity);

            // Act
            var act = _reservationCommandHandler.Invoking(async x => await x.Handle(command, _cancellationTokenSource.Token));

            //Assert
            await act.Should().ThrowExactlyAsync<UserNotFoundException>();
        }

        [Fact]
        public async Task CreateReservation_ShouldThrowAuthenticationFailureException_WhenUserIdFromCookieIsNotUserIdFromRequestAndUserIsNotAdmin()
        {
            SetupHttpAccessor("1");
            // Arrange
            var command = new CreateReservationCommand
            {
                ActivityId = 4,
                UserId = 2,
                StartTime = DateTime.Now
            };

            var user = new Domain.User
            {
                Id = 1,
                Name = "userName"
            };

            var activity = new Domain.Activity
            {
                Id = 4,
                Duration = 40,
                TotalCapacity = 20,
                StartTime = DateTime.Now.AddDays(2),
                EndTime = DateTime.Now.AddDays(31),
                Name = "Boks",
                ShortDescription = "Short test description.",
                LongDescription = "Looooooooooooooong test description.",
                Cron = "0 15 * * TUE",
            };

            _repositoryMock.Setup(x => x.GetUser(It.IsAny<int>())).Returns(user);
            _repositoryMock.Setup(x => x.GetActivity(It.IsAny<int>())).Returns(activity);

            // Act
            var act = _reservationCommandHandler.Invoking(async x => await x.Handle(command, _cancellationTokenSource.Token));

            //Assert
            await act.Should().ThrowExactlyAsync<AuthenticationFailureException>();
        }

        [Fact]
        public async Task CreateReservation_ShouldThrowReservationDisabledException_WhenUserHasReservationDisabled()
        {
            SetupHttpAccessor("1");
            // Arrange
            var command = new CreateReservationCommand
            {
                ActivityId = 4,
                UserId = 2,
                StartTime = DateTime.Now
            };

            var user = new Domain.User
            {
                Id = 1,
                Name = "userName",
                ReservationDisabled = true
            };

            var activity = new Domain.Activity
            {
                Id = 4,
                Duration = 40,
                TotalCapacity = 20,
                StartTime = DateTime.Now.AddDays(2),
                EndTime = DateTime.Now.AddDays(31),
                Name = "Boks",
                ShortDescription = "Short test description.",
                LongDescription = "Looooooooooooooong test description.",
                Cron = "0 15 * * TUE",
            };

            _repositoryMock.Setup(x => x.GetUser(It.IsAny<int>())).Returns(user);
            _repositoryMock.Setup(x => x.GetActivity(It.IsAny<int>())).Returns(activity);

            // Act
            var act = _reservationCommandHandler.Invoking(async x => await x.Handle(command, _cancellationTokenSource.Token));

            //Assert
            await act.Should().ThrowExactlyAsync<AuthenticationFailureException>();
        }

        [Fact]
        public async Task CreateReservation_ShouldThrowActivityNotFoundException_WhenNoActivity()
        {
            SetupHttpAccessor("2");
            // Arrange
            var command = new CreateReservationCommand
            {
                ActivityId = 4,
                UserId = 2,
                StartTime = DateTime.Now
            };

            var user = new Domain.User
            {
                Id = 2,
                Name = "userName"
            };

            _repositoryMock.Setup(x => x.GetUser(It.IsAny<int>())).Returns(user);

            // Act
            var act = _reservationCommandHandler.Invoking(async x => await x.Handle(command, _cancellationTokenSource.Token));

            //Assert
            await act.Should().ThrowExactlyAsync<ActivityNotFoundException>();
        }

        [Fact]
        public async Task CreateReservation_ShouldSucceed()
        {
            SetupHttpAccessor("1");
            // Arrange
            var command = new CreateReservationCommand
            {
                ActivityId = 4,
                UserId = 1,
                StartTime = DateTime.Now
            };

            var user = new Domain.User
            {
                Id = 1,
                Name = "userName"
            };

            var activity = new Domain.Activity
            {
                Id = 4,
                Duration = 40,
                TotalCapacity = 20,
                StartTime = DateTime.Now.AddDays(2),
                EndTime = DateTime.Now.AddDays(31),
                Name = "Boks",
                ShortDescription = "Short test description.",
                LongDescription = "Looooooooooooooong test description.",
                Cron = "0 15 * * TUE",
            };

            _repositoryMock.Setup(x => x.GetUser(It.IsAny<int>())).Returns(user);
            _repositoryMock.Setup(x => x.GetActivity(It.IsAny<int>())).Returns(activity);

            // Act
            var result = await _reservationCommandHandler.Handle(command, _cancellationTokenSource.Token);

            //Assert
            _repositoryMock.Verify(x => x.Add(It.Is<Domain.Reservation>(a =>
                a.Activity.Id == command.ActivityId &&
                a.User.Id == command.UserId &&
                a.StartTime == command.StartTime
            )), Times.Once);

            _repositoryMock.Verify(x => x.SaveChangesAsync(), Times.Once);

            result.Should().NotBeNull();
        }

        private void SetupHttpAccessor(string? userId, string role = "User")
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, role)
            };
            var identity = new ClaimsIdentity(claims, "TestAuth");
            var principal = new ClaimsPrincipal(identity);

            var contextMock = new Mock<HttpContext>();
            contextMock.Setup(x => x.User).Returns(principal);

            var cookieCollectionMock = new Mock<IRequestCookieCollection>();
            cookieCollectionMock.Setup(x => x.TryGetValue(Cookies.UserId, out userId)).Returns(true);

            var requestMock = new Mock<HttpRequest>();
            requestMock.Setup(x => x.Cookies).Returns(cookieCollectionMock.Object);

            contextMock.Setup(x => x.Request).Returns(requestMock.Object);

            _httpAccessorMock.Setup(x => x.HttpContext).Returns(contextMock.Object);
        }

    }
}
