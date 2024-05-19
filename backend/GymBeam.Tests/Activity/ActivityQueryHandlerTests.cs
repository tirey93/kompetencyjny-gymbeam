using Domain;
using Domain.Exceptions;
using GymBeam.Queries;
using GymBeam.QueryHandlers;

namespace GymBeam.Tests.Activity
{
    public class ActivityQueryHandlerTests
    {
        private readonly Mock<IRepository> _repositoryMock;
        private readonly ActivityQueryHandler _activityQueryHandler;
        private readonly CancellationTokenSource _cancellationTokenSource;

        public ActivityQueryHandlerTests()
        {
            _repositoryMock = new Mock<IRepository>();
            _activityQueryHandler = new ActivityQueryHandler(_repositoryMock.Object);
            _cancellationTokenSource = new CancellationTokenSource();
        }

        [Fact]
        public async Task GetActivity_ShouldReturnActivityResponse()
        {
            //Arrange
            var activity = new Domain.Activity
            {
                Id = 1,
                Duration = 30,
                TotalCapacity = 15,
                StartTime = DateTime.Now.AddDays(5),
                EndTime = DateTime.Now.AddDays(90),
                Name = "Karate",
                ShortDescription = "Short test description.",
                LongDescription = "Looooooooooooooong test description.",
                Cron = "0 15 * * TUE",
            };
            var query = new GetActivityQuery
            {
                ActivityId = activity.Id
            };

            _repositoryMock.Setup(x => x.GetActivity(It.IsAny<int>())).Returns(activity);

            //Act
            var result = await _activityQueryHandler.Handle(query, _cancellationTokenSource.Token);

            //Assert
            result.Should().NotBeNull();
            result.Id.Should().Be(activity.Id);
            result.Duration.Should().Be(activity.Duration);
            result.TotalCapacity.Should().Be(activity.TotalCapacity);
            result.StartTime.Should().Be(activity.StartTime);
            result.EndTime.Should().Be(activity.EndTime);
            result.Name.Should().BeEquivalentTo(activity.Name);
            result.ShortDescription.Should().BeEquivalentTo(activity.ShortDescription);
            result.LongDescription.Should().BeEquivalentTo(activity.LongDescription);
            result.Cron.Should().BeEquivalentTo(activity.Cron);
        }

        [Fact]
        public async Task GetActivity_WhenActivityNotExists_ShouldThrowActivityNotFoundException()
        {
            //Arrange
            var query = new GetActivityQuery
            {
                ActivityId = 18
            };

            _repositoryMock.Setup(x => x.GetActivity(It.IsAny<int>())).Returns((Domain.Activity)null);

            //Assert
            var act = _activityQueryHandler.Invoking(async x => await x.Handle(query, _cancellationTokenSource.Token));
            await act.Should().ThrowExactlyAsync<ActivityNotFoundException>();
        }

        [Fact]
        public async Task GetAllActivities_ShouldReturnListActivityResponse()
        {
            //Arrange
            var activities = new List<Domain.Activity>
            {
                new Domain.Activity
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
                },
                new Domain.Activity
                {
                    Id = 9,
                    Duration = 60,
                    TotalCapacity = 30,
                    StartTime = DateTime.Now.AddDays(4),
                    EndTime = DateTime.Now.AddDays(62),
                    Name = "Bieznia",
                    ShortDescription = "Short test description 1.",
                    LongDescription = "Looooooooooooooong test description 2.",
                    Cron = "0 12 * * FRI",
                }
            };

            var query = new GetAllActivitiesQuery();

            _repositoryMock.Setup(x => x.GetActivities(null)).Returns(activities);

            //Act
            var result = await _activityQueryHandler.Handle(query, _cancellationTokenSource.Token);

            //Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(activities.Count);
            result.ToArray()[0].Id.Should().Be(activities[0].Id);
            result.ToArray()[0].Duration.Should().Be(activities[0].Duration);
            result.ToArray()[0].TotalCapacity.Should().Be(activities[0].TotalCapacity);
            result.ToArray()[0].StartTime.Should().Be(activities[0].StartTime);
            result.ToArray()[0].EndTime.Should().Be(activities[0].EndTime);
            result.ToArray()[0].Name.Should().BeEquivalentTo(activities[0].Name);
            result.ToArray()[0].ShortDescription.Should().BeEquivalentTo(activities[0].ShortDescription);
            result.ToArray()[0].LongDescription.Should().BeEquivalentTo(activities[0].LongDescription);
            result.ToArray()[0].Cron.Should().BeEquivalentTo(activities[0].Cron);

            result.ToArray()[1].Id.Should().Be(activities[1].Id);
            result.ToArray()[1].Duration.Should().Be(activities[1].Duration);
            result.ToArray()[1].TotalCapacity.Should().Be(activities[1].TotalCapacity);
            result.ToArray()[1].StartTime.Should().Be(activities[1].StartTime);
            result.ToArray()[1].EndTime.Should().Be(activities[1].EndTime);
            result.ToArray()[1].Name.Should().BeEquivalentTo(activities[1].Name);
            result.ToArray()[1].ShortDescription.Should().BeEquivalentTo(activities[1].ShortDescription);
            result.ToArray()[1].LongDescription.Should().BeEquivalentTo(activities[1].LongDescription);
            result.ToArray()[1].Cron.Should().BeEquivalentTo(activities[1].Cron);
        }

        [Fact]
        public async Task GetAllActivities_WhenNull_ShouldReturnEmpty()
        {
            //Arrange
            var query = new GetAllActivitiesQuery();

            _repositoryMock.Setup(x => x.GetActivities(null)).Returns((List<Domain.Activity>)null);

            //Act
            var result = await _activityQueryHandler.Handle(query, _cancellationTokenSource.Token);

            //Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(0);
        }

        [Fact]
        public async Task GetAllActivities_WhenEmpty_ShouldReturnEmpty()
        {
            //Arrange
            var query = new GetAllActivitiesQuery();

            _repositoryMock.Setup(x => x.GetActivities(null)).Returns(new List<Domain.Activity>());

            //Act
            var result = await _activityQueryHandler.Handle(query, _cancellationTokenSource.Token);

            //Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(0);
        }
    }
}
