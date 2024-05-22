using Domain;
using GymBeam.Queries;
using GymBeam.QueryHandlers;

namespace GymBeam.Tests.Reservation
{
    public class ReservationQueryHandlerTests
    {
        private readonly Mock<IRepository> _repositoryMock;
        private readonly ReservationQueryHandler _reservationQueryHandler;
        private readonly CancellationTokenSource _cancellationTokenSource;

        public ReservationQueryHandlerTests()
        {
            _repositoryMock = new Mock<IRepository>();
            _reservationQueryHandler = new ReservationQueryHandler(_repositoryMock.Object);
            _cancellationTokenSource = new CancellationTokenSource();
        }

        [Fact]
        public async Task GetAllReservations_ShouldReturnListReservationResponse()
        {
            //Arrange
            var reservations = new List<Domain.Reservation>
            {
                new Domain.Reservation
                {
                    Id = 4,
                    User = new Domain.User
                    {
                        Id = 1,
                        Name = "UserName",
                        DisplayName = "UserDisplayName2"
                    },
                    Activity = new Domain.Activity
                    {
                        Id = 2,
                        Leader = new Domain.User
                        {
                            Id = 1,
                            Name = "LeaderName"
                        },
                        TotalCapacity = 15,
                        Duration = 90,
                        Name = "Dance",
                        ShortDescription = "Short Dance",
                        LongDescription = "Long Dance Description"
                    },
                    StartTime = DateTime.Now
                },
                new Domain.Reservation
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
                    StartTime = new DateTime(2024, 10, 25, 16, 0 , 0)
                }
            };

            _repositoryMock.Setup(x => x.GetReservations(It.IsAny<Func<Domain.Reservation, bool>>())).Returns(reservations);
            var query = new GetAllReservationsQuery();

            //Act
            var result = (await _reservationQueryHandler.Handle(query, _cancellationTokenSource.Token)).ToList();

            //Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(2);

            result[0].Id.Should().Be(reservations[0].Id);
            result[0].ActivityId.Should().Be(reservations[0].Activity.Id);
            result[0].UserId.Should().Be(reservations[0].User.Id);
            result[0].Duration.Should().Be(reservations[0].Activity.Duration);
            result[0].StartTime.Should().Be(reservations[0].StartTime);
            result[0].ActivityName.Should().BeEquivalentTo(reservations[0].Activity.Name);
            result[0].LeaderName.Should().BeEquivalentTo(reservations[0].Activity.Leader.Name);
            result[0].UserDisplayName.Should().BeEquivalentTo(reservations[0].User.DisplayName);

            result[1].Id.Should().Be(reservations[1].Id);
            result[1].ActivityId.Should().Be(reservations[1].Activity.Id);
            result[1].UserId.Should().Be(reservations[1].User.Id);
            result[1].Duration.Should().Be(reservations[1].Activity.Duration);
            result[1].StartTime.Should().Be(reservations[1].StartTime);
            result[1].ActivityName.Should().BeEquivalentTo(reservations[1].Activity.Name);
            result[1].LeaderName.Should().BeEquivalentTo(reservations[1].Activity.Leader.Name);
            result[1].UserDisplayName.Should().BeEquivalentTo(reservations[1].User.DisplayName);
        }

        [Fact]
        public async Task GetAllReservations_WhenNull_ShouldReturnEmpty()
        {
            //Arrange
            var query = new GetAllReservationsQuery();
            _repositoryMock.Setup(x => x.GetReservations(null)).Returns((List<Domain.Reservation>)null);

            //Act
            var result = await _reservationQueryHandler.Handle(query, _cancellationTokenSource.Token);

            //Assert
            Assert.NotNull(result);
            Assert.Empty(result);
        }

        [Fact]
        public async Task GetAllReservations_WhenEmpty_ShouldReturnEmpty()
        {
            //Arrange
            var query = new GetAllReservationsQuery();

            _repositoryMock.Setup(x => x.GetReservations(null)).Returns(new List<Domain.Reservation>());

            //Act
            var result = await _reservationQueryHandler.Handle(query, _cancellationTokenSource.Token);

            //Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(0);
        }
    }
}
