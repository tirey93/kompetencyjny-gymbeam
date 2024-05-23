
using Domain;
using GymBeam.Constants;
using GymBeam.Exceptions;
using GymBeam.Queries;
using GymBeam.QueryHandlers;
using Microsoft.AspNetCore.Http;

namespace GymBeam.Tests.Enrollment
{
    public class EnrollementQueryHandlerTests
    {
        private readonly Mock<IRepository> _repositoryMock;
        private Mock<IHttpContextAccessor> _httpAccessorMock;
        private readonly EnrollementQueryHandler _enrollmentQueryHandler;
        private readonly CancellationTokenSource _cancellationTokenSource;

        public EnrollementQueryHandlerTests()
        {
            _repositoryMock = new Mock<IRepository>();
            
            _httpAccessorMock = new Mock<IHttpContextAccessor>();
            _enrollmentQueryHandler = new EnrollementQueryHandler(_repositoryMock.Object, _httpAccessorMock.Object);
            _cancellationTokenSource = new CancellationTokenSource();
        }

        [Fact]
        public async Task GetEnrollementsLoggedUserQuery_ShouldReturnResponse()
        {
            //Arrange
            SetupHttpAccessor("78");

            var activities = new List<Domain.Activity>
            {
                new Domain.Activity
                {
                    Id = 1,
                    Leader = new Domain.User
                    {
                        Id = 1,
                        Name = "LeaderName"
                    },
                    TotalCapacity = 20,
                    Duration = 60,
                    Name = "Box",
                    ShortDescription = "Short Box",
                    LongDescription = "Long Box Description"
                },
                new Domain.Activity
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
                }
            };
            var reservations = new List<Domain.Reservation>
            {
                new Domain.Reservation
                {
                    Id = 1,
                    StartTime = new DateTime(2024, 10, 25, 16, 0 , 0),
                    Activity = activities[0]
                },
                new Domain.Reservation
                {
                    Id = 2,
                    StartTime = new DateTime(2024, 10, 25, 18, 0 , 0),
                    Activity = activities[0]
                },
                new Domain.Reservation
                {
                    Id = 3,
                    StartTime = new DateTime(2024, 10, 25, 16, 0 , 0),
                    Activity = activities[1]
                },

            };

            var slotsTakenDict = new Dictionary<Domain.Enrollment, int>
            {
                { new Domain.Enrollment {ActivityId = activities[0].Id, StartTime = reservations[0].StartTime}, 2 },
                { new Domain.Enrollment {ActivityId = activities[1].Id, StartTime = reservations[2].StartTime}, 3 }
            };
            _repositoryMock.Setup(x => x.GetReservations(It.IsAny<Func<Domain.Reservation, bool>>())).Returns(reservations);
            _repositoryMock.Setup(x => x.GetSlotsTakenForEnrollments(It.IsAny<DateTime>(), It.IsAny<DateTime>())).Returns(slotsTakenDict);

            var query = new GetEnrollementsLoggedUserQuery();

            //Act
            var result = (await _enrollmentQueryHandler.Handle(query, _cancellationTokenSource.Token)).ToList();

            //Assert

            result.Should().NotBeNull();
            result.Should().HaveCount(3);

            result[0].ReservationId.Should().Be(1);
            result[0].ActivityId.Should().Be(1);
            result[0].LeaderId.Should().Be(1);
            result[0].SlotsTaken.Should().Be(2);
            result[0].TotalCapacity.Should().Be(20);
            result[0].StartTime.Should().Be(new DateTime(2024, 10, 25, 16, 0, 0));
            result[0].Duration.Should().Be(60);
            result[0].Name.Should().BeEquivalentTo("Box");
            result[0].ShortDescription.Should().BeEquivalentTo("Short Box");
            result[0].LongDescription.Should().BeEquivalentTo("Long Box Description");
            result[0].LeaderName.Should().BeEquivalentTo("LeaderName");

            result[1].ReservationId.Should().Be(2);
            result[1].ActivityId.Should().Be(1);
            result[1].LeaderId.Should().Be(1);
            result[1].SlotsTaken.Should().Be(0);
            result[1].TotalCapacity.Should().Be(20);
            result[1].StartTime.Should().Be(new DateTime(2024, 10, 25, 18, 0, 0));
            result[1].Duration.Should().Be(60);
            result[1].Name.Should().BeEquivalentTo("Box");
            result[1].ShortDescription.Should().BeEquivalentTo("Short Box");
            result[1].LongDescription.Should().BeEquivalentTo("Long Box Description");
            result[1].LeaderName.Should().BeEquivalentTo("LeaderName");

            result[2].ReservationId.Should().Be(3);
            result[2].ActivityId.Should().Be(2);
            result[2].LeaderId.Should().Be(1);
            result[2].SlotsTaken.Should().Be(3);
            result[2].TotalCapacity.Should().Be(15);
            result[2].StartTime.Should().Be(new DateTime(2024, 10, 25, 16, 0, 0));
            result[2].Duration.Should().Be(90);
            result[2].Name.Should().BeEquivalentTo("Dance");
            result[2].ShortDescription.Should().BeEquivalentTo("Short Dance");
            result[2].LongDescription.Should().BeEquivalentTo("Long Dance Description");
            result[2].LeaderName.Should().BeEquivalentTo("LeaderName");
        }

        [Fact]
        public async Task GetEnrollementsLoggedUserQuery_WhenLoggedUserNull_ShouldThrowInvalidCookieException()
        {
            //Arrange
            SetupHttpAccessor(null);

            var query = new GetEnrollementsLoggedUserQuery();

            //Act && Assert
            var act = _enrollmentQueryHandler.Invoking(async x => await x.Handle(query, _cancellationTokenSource.Token));
            await act.Should().ThrowExactlyAsync<InvalidCookieException>();
        }

        [Fact]
        public async Task GetEnrollementsLoggedUserQuery_WhenLoggedUserNotInt_ShouldThrowInvalidCookieException()
        {
            //Arrange
            SetupHttpAccessor("something");

            var query = new GetEnrollementsLoggedUserQuery();

            //Act && Assert
            var act = _enrollmentQueryHandler.Invoking(async x => await x.Handle(query, _cancellationTokenSource.Token));
            await act.Should().ThrowExactlyAsync<InvalidCookieException>();
        }

        [Fact]
        public async Task GetEnrollmentsByDatesQuery_WhenNoLoggedUser_ShouldReturnList()
        {
            //Arrange
            SetupHttpAccessor(null);
            var activities = new List<Domain.Activity>
            {
                new Domain.Activity
                {
                    Id = 1,
                    Leader = new Domain.User
                    {
                        Id = 1,
                        Name = "LeaderName"
                    },
                    TotalCapacity = 20,
                    Duration = 60,
                    Name = "Box",
                    ShortDescription = "Short Box",
                    LongDescription = "Long Box Description",
                    Cron = "0 12,14,16 * * *"
                },
                new Domain.Activity
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
                    LongDescription = "Long Dance Description",
                    Cron = "0 15 * * 3,4"
                }
            };

            var slotsTakenDict = new Dictionary<Domain.Enrollment, int>
            {
                { new Domain.Enrollment {ActivityId = activities[0].Id, StartTime = new DateTime(2024, 7, 11, 12, 0, 0)}, 2 },
                { new Domain.Enrollment {ActivityId = activities[0].Id, StartTime = new DateTime(2024, 7, 11, 14, 0, 0)}, 3 },
                { new Domain.Enrollment {ActivityId = activities[0].Id, StartTime = new DateTime(2024, 7, 12, 12, 0, 0)}, 5 },
                { new Domain.Enrollment {ActivityId = activities[1].Id, StartTime = new DateTime(2024, 7, 10, 15, 0, 0)}, 12 },
                { new Domain.Enrollment {ActivityId = activities[1].Id, StartTime = new DateTime(2024, 7, 11, 15, 0, 0)}, 9 },
            };

            _repositoryMock.Setup(x => x.GetActivities(It.IsAny<Func<Domain.Activity, bool>>())).Returns(activities);
            _repositoryMock.Setup(x => x.GetSlotsTakenForEnrollments(It.IsAny<DateTime>(), It.IsAny<DateTime>())).Returns(slotsTakenDict);

            var query = new GetEnrollmentsByDatesQuery
            {
                From = new DateTime(2024, 7, 10, 15, 0, 0),
                To = new DateTime(2024, 7, 12, 16, 0, 0),
            };

            //Act
            var result = (await _enrollmentQueryHandler.Handle(query, _cancellationTokenSource.Token)).ToList();

            var r = System.Text.Json.JsonSerializer.Serialize(result);


            //Assert

            result.Should().NotBeNull();
            result.Should().HaveCount(9);

            result[0].ReservationId.Should().BeNull();
            result[0].ActivityId.Should().Be(1);
            result[0].LeaderId.Should().Be(1);
            result[0].SlotsTaken.Should().Be(0);
            result[0].TotalCapacity.Should().Be(20);
            result[0].StartTime.Should().Be(new DateTime(2024, 7, 10, 16, 0, 0));
            result[0].Duration.Should().Be(60);
            result[0].Name.Should().BeEquivalentTo("Box");
            result[0].ShortDescription.Should().BeEquivalentTo("Short Box");
            result[0].LongDescription.Should().BeEquivalentTo("Long Box Description");
            result[0].LeaderName.Should().BeEquivalentTo("LeaderName");

            result[1].ReservationId.Should().BeNull();
            result[1].ActivityId.Should().Be(1);
            result[1].LeaderId.Should().Be(1);
            result[1].SlotsTaken.Should().Be(2);
            result[1].TotalCapacity.Should().Be(20);
            result[1].StartTime.Should().Be(new DateTime(2024, 7, 11, 12, 0, 0));
            result[1].Duration.Should().Be(60);
            result[1].Name.Should().BeEquivalentTo("Box");
            result[1].ShortDescription.Should().BeEquivalentTo("Short Box");
            result[1].LongDescription.Should().BeEquivalentTo("Long Box Description");
            result[1].LeaderName.Should().BeEquivalentTo("LeaderName");

            result[2].ReservationId.Should().BeNull();
            result[2].ActivityId.Should().Be(1);
            result[2].LeaderId.Should().Be(1);
            result[2].SlotsTaken.Should().Be(3);
            result[2].TotalCapacity.Should().Be(20);
            result[2].StartTime.Should().Be(new DateTime(2024, 7, 11, 14, 0, 0));
            result[2].Duration.Should().Be(60);
            result[2].Name.Should().BeEquivalentTo("Box");
            result[2].ShortDescription.Should().BeEquivalentTo("Short Box");
            result[2].LongDescription.Should().BeEquivalentTo("Long Box Description");
            result[2].LeaderName.Should().BeEquivalentTo("LeaderName");

            result[3].ReservationId.Should().BeNull();
            result[3].ActivityId.Should().Be(1);
            result[3].LeaderId.Should().Be(1);
            result[3].SlotsTaken.Should().Be(0);
            result[3].TotalCapacity.Should().Be(20);
            result[3].StartTime.Should().Be(new DateTime(2024, 7, 11, 16, 0, 0));
            result[3].Duration.Should().Be(60);
            result[3].Name.Should().BeEquivalentTo("Box");
            result[3].ShortDescription.Should().BeEquivalentTo("Short Box");
            result[3].LongDescription.Should().BeEquivalentTo("Long Box Description");
            result[3].LeaderName.Should().BeEquivalentTo("LeaderName");

            result[4].ReservationId.Should().BeNull();
            result[4].ActivityId.Should().Be(1);
            result[4].LeaderId.Should().Be(1);
            result[4].SlotsTaken.Should().Be(5);
            result[4].TotalCapacity.Should().Be(20);
            result[4].StartTime.Should().Be(new DateTime(2024, 7, 12, 12, 0, 0));
            result[4].Duration.Should().Be(60);
            result[4].Name.Should().BeEquivalentTo("Box");
            result[4].ShortDescription.Should().BeEquivalentTo("Short Box");
            result[4].LongDescription.Should().BeEquivalentTo("Long Box Description");
            result[4].LeaderName.Should().BeEquivalentTo("LeaderName");

            result[5].ReservationId.Should().BeNull();
            result[5].ActivityId.Should().Be(1);
            result[5].LeaderId.Should().Be(1);
            result[5].SlotsTaken.Should().Be(0);
            result[5].TotalCapacity.Should().Be(20);
            result[5].StartTime.Should().Be(new DateTime(2024, 7, 12, 14, 0, 0));
            result[5].Duration.Should().Be(60);
            result[5].Name.Should().BeEquivalentTo("Box");
            result[5].ShortDescription.Should().BeEquivalentTo("Short Box");
            result[5].LongDescription.Should().BeEquivalentTo("Long Box Description");
            result[5].LeaderName.Should().BeEquivalentTo("LeaderName");

            result[6].ReservationId.Should().BeNull();
            result[6].ActivityId.Should().Be(1);
            result[6].LeaderId.Should().Be(1);
            result[6].SlotsTaken.Should().Be(0);
            result[6].TotalCapacity.Should().Be(20);
            result[6].StartTime.Should().Be(new DateTime(2024, 7, 12, 16, 0, 0));
            result[6].Duration.Should().Be(60);
            result[6].Name.Should().BeEquivalentTo("Box");
            result[6].ShortDescription.Should().BeEquivalentTo("Short Box");
            result[6].LongDescription.Should().BeEquivalentTo("Long Box Description");
            result[6].LeaderName.Should().BeEquivalentTo("LeaderName");

            result[7].ReservationId.Should().BeNull();
            result[7].ActivityId.Should().Be(2);
            result[7].LeaderId.Should().Be(1);
            result[7].SlotsTaken.Should().Be(12);
            result[7].TotalCapacity.Should().Be(15);
            result[7].StartTime.Should().Be(new DateTime(2024, 7, 10, 15, 0, 0));
            result[7].Duration.Should().Be(90);
            result[7].Name.Should().BeEquivalentTo("Dance");
            result[7].ShortDescription.Should().BeEquivalentTo("Short Dance");
            result[7].LongDescription.Should().BeEquivalentTo("Long Dance Description");
            result[7].LeaderName.Should().BeEquivalentTo("LeaderName");

            result[8].ReservationId.Should().BeNull();
            result[8].ActivityId.Should().Be(2);
            result[8].LeaderId.Should().Be(1);
            result[8].SlotsTaken.Should().Be(9);
            result[8].TotalCapacity.Should().Be(15);
            result[8].StartTime.Should().Be(new DateTime(2024, 7, 11, 15, 0, 0));
            result[8].Duration.Should().Be(90);
            result[8].Name.Should().BeEquivalentTo("Dance");
            result[8].ShortDescription.Should().BeEquivalentTo("Short Dance");
        }

        [Fact]
        public async Task GetEnrollmentsByDatesQuery_WhenLoggedUser_ShouldReturnList()
        {
            //Arrange
            SetupHttpAccessor("78");
            var activities = new List<Domain.Activity>
            {
                new Domain.Activity
                {
                    Id = 1,
                    Leader = new Domain.User
                    {
                        Id = 1,
                        Name = "LeaderName"
                    },
                    TotalCapacity = 20,
                    Duration = 60,
                    Name = "Box",
                    ShortDescription = "Short Box",
                    LongDescription = "Long Box Description",
                    Cron = "0 12,14,16 * * *"
                }
            };

            var slotsTakenDict = new Dictionary<Domain.Enrollment, int>
            {
                { new Domain.Enrollment {ActivityId = activities[0].Id, StartTime = new DateTime(2024, 7, 11, 12, 0, 0)}, 2 },
                { new Domain.Enrollment {ActivityId = activities[0].Id, StartTime = new DateTime(2024, 7, 11, 14, 0, 0)}, 3 }
            };

            var reservations = new List<Domain.Reservation>
            {
                new Domain.Reservation
                {
                    Id = 1,
                    StartTime = new DateTime(2024, 7, 11, 12, 0, 0),
                    Activity = activities[0]
                },

            };

            _repositoryMock.Setup(x => x.GetReservations(It.IsAny<Func<Domain.Reservation, bool>>())).Returns(reservations);
            _repositoryMock.Setup(x => x.GetActivities(It.IsAny<Func<Domain.Activity, bool>>())).Returns(activities);
            _repositoryMock.Setup(x => x.GetSlotsTakenForEnrollments(It.IsAny<DateTime>(), It.IsAny<DateTime>())).Returns(slotsTakenDict);

            var query = new GetEnrollmentsByDatesQuery
            {
                From = new DateTime(2024, 7, 10, 15, 0, 0),
                To = new DateTime(2024, 7, 11, 18, 0, 0),
            };

            //Act
            var result = (await _enrollmentQueryHandler.Handle(query, _cancellationTokenSource.Token)).ToList();

            var r = System.Text.Json.JsonSerializer.Serialize(result);


            //Assert

            result.Should().NotBeNull();
            result.Should().HaveCount(4);

            result[0].ReservationId.Should().BeNull();
            result[0].ActivityId.Should().Be(1);
            result[0].LeaderId.Should().Be(1);
            result[0].SlotsTaken.Should().Be(0);
            result[0].TotalCapacity.Should().Be(20);
            result[0].StartTime.Should().Be(new DateTime(2024, 7, 10, 16, 0, 0));
            result[0].Duration.Should().Be(60);
            result[0].Name.Should().BeEquivalentTo("Box");
            result[0].ShortDescription.Should().BeEquivalentTo("Short Box");
            result[0].LongDescription.Should().BeEquivalentTo("Long Box Description");
            result[0].LeaderName.Should().BeEquivalentTo("LeaderName");

            result[1].ReservationId.Should().Be(1);
            result[1].ActivityId.Should().Be(1);
            result[1].LeaderId.Should().Be(1);
            result[1].SlotsTaken.Should().Be(2);
            result[1].TotalCapacity.Should().Be(20);
            result[1].StartTime.Should().Be(new DateTime(2024, 7, 11, 12, 0, 0));
            result[1].Duration.Should().Be(60);
            result[1].Name.Should().BeEquivalentTo("Box");
            result[1].ShortDescription.Should().BeEquivalentTo("Short Box");
            result[1].LongDescription.Should().BeEquivalentTo("Long Box Description");
            result[1].LeaderName.Should().BeEquivalentTo("LeaderName");

            result[2].ReservationId.Should().BeNull();
            result[2].ActivityId.Should().Be(1);
            result[2].LeaderId.Should().Be(1);
            result[2].SlotsTaken.Should().Be(3);
            result[2].TotalCapacity.Should().Be(20);
            result[2].StartTime.Should().Be(new DateTime(2024, 7, 11, 14, 0, 0));
            result[2].Duration.Should().Be(60);
            result[2].Name.Should().BeEquivalentTo("Box");
            result[2].ShortDescription.Should().BeEquivalentTo("Short Box");
            result[2].LongDescription.Should().BeEquivalentTo("Long Box Description");
            result[2].LeaderName.Should().BeEquivalentTo("LeaderName");

            result[3].ReservationId.Should().BeNull();
            result[3].ActivityId.Should().Be(1);
            result[3].LeaderId.Should().Be(1);
            result[3].SlotsTaken.Should().Be(0);
            result[3].TotalCapacity.Should().Be(20);
            result[3].StartTime.Should().Be(new DateTime(2024, 7, 11, 16, 0, 0));
            result[3].Duration.Should().Be(60);
            result[3].Name.Should().BeEquivalentTo("Box");
            result[3].ShortDescription.Should().BeEquivalentTo("Short Box");
            result[3].LongDescription.Should().BeEquivalentTo("Long Box Description");
            result[3].LeaderName.Should().BeEquivalentTo("LeaderName");
        }

        private void SetupHttpAccessor(string? cookiesUserId)
        {
            var cookieCollectionMock = new Mock<IRequestCookieCollection>();
            cookieCollectionMock.Setup(x => x.TryGetValue(Cookies.UserId, out cookiesUserId)).Returns(true);
            var requestMock = new Mock<HttpRequest>(); 
            requestMock.Setup(x => x.Cookies).Returns(cookieCollectionMock.Object);
            var httpContextMock = new Mock<HttpContext>();
            httpContextMock.Setup(x => x.Request).Returns(requestMock.Object);

            _httpAccessorMock.Setup(x => x.HttpContext).Returns(httpContextMock.Object);
        }

    }
}