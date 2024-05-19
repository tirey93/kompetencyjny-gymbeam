
using Domain;
using Domain.Exceptions;
using GymBeam.CommandHandlers;
using GymBeam.Commands;

namespace GymBeam.Tests.Activity
{
    public class ActivityCommandHandlerTests
    {
        private readonly Mock<IRepository> _repositoryMock;
        private readonly Mock<Domain.Activity> _activityMock;
        private readonly ActivityCommandHandler _activityCommandHandler;
        private readonly CancellationTokenSource _cancellationTokenSource;

        public ActivityCommandHandlerTests()
        {
            _activityMock = new Mock<Domain.Activity>();
            _repositoryMock = new Mock<IRepository>();
            _repositoryMock.Setup(x => x.GetActivity(It.IsAny<int>())).Returns(_activityMock.Object);

            _activityCommandHandler = new ActivityCommandHandler(_repositoryMock.Object);
            _cancellationTokenSource = new CancellationTokenSource();
        }

        [Fact]
        public async Task CreateActivity_ShouldSucceed()
        {
            //Arrange
            var duration = 64;
            var totalCapacity = 20;
            int? leaderId = null;
            var startTime = DateTime.Now.AddDays(2);
            var endTime = DateTime.Now.AddDays(31);
            var name = "Boks";
            var shortDescription = "Short test description.";
            var longDescription = "Looooooooooooooong test description.";
            var cron = "0 15 * * TUE";

            var command = new CreateActivityCommand
            {
                Duration = duration,
                TotalCapacity = totalCapacity,
                LeaderId = leaderId,
                StartTime = startTime,
                EndTime = endTime,
                Name = name,
                ShortDescription = shortDescription,
                LongDescription = longDescription,
                Cron = cron
            };

            //Act
            var result = await _activityCommandHandler.Handle(command, _cancellationTokenSource.Token);

            //Assert
            _repositoryMock.Verify(x => x.Add(It.Is<Domain.Activity>(a =>
                a.Duration == duration &&
                a.TotalCapacity == totalCapacity &&
                a.StartTime == startTime &&
                a.EndTime == endTime &&
                a.Name == name &&
                a.ShortDescription == shortDescription &&
                a.LongDescription == longDescription &&
                a.Cron == cron
            )), Times.Once);

            _repositoryMock.Verify(x => x.SaveChangesAsync(), Times.Once);

            result.Should().NotBeNull();
        }

        [Fact]
        public async Task CreateActivity_LeaderNotFound_ShouldThrowUserNotFoundException()
        {
            //Arrange
            var duration = 64;
            var totalCapacity = 20;
            int leaderId = 15;
            var startTime = DateTime.Now.AddDays(2);
            var endTime = DateTime.Now.AddDays(31);
            var name = "Boks";
            var shortDescription = "Short test description.";
            var longDescription = "Looooooooooooooong test description.";
            var cron = "0 15 * * TUE";

            var command = new CreateActivityCommand
            {
                Duration = duration,
                TotalCapacity = totalCapacity,
                LeaderId = leaderId,
                StartTime = startTime,
                EndTime = endTime,
                Name = name,
                ShortDescription = shortDescription,
                LongDescription = longDescription,
                Cron = cron
            };

            _repositoryMock.Setup(x => x.GetUsers(It.IsAny<Func<Domain.User, bool>>())).Returns(new List<Domain.User>());

            //Act
            var act = _activityCommandHandler.Invoking(async x => await x.Handle(command, _cancellationTokenSource.Token));
           
            //Assert
            await act.Should().ThrowExactlyAsync<UserNotFoundException>();
        }

        [Fact]
        public void UpdateActivity_ShouldSucceed()
        {
            //Arrange
            var duration = 32;
            var totalCapacity = 10;
            int? leaderId = null;
            var startTime = DateTime.Now.AddDays(5);
            var endTime = DateTime.Now.AddDays(15);
            var name = "Joga";
            var shortDescription = "Short desc.";
            var longDescription = "Long desc.";
            var cron = "0 15 * * MON";
            var activityId = 15;

            var command = new UpdateActivityCommand
            {
                ActivityId = activityId,
                Duration = duration,
                TotalCapacity = totalCapacity,
                LeaderId = leaderId,
                StartTime = startTime,
                EndTime = endTime,
                Name = name,
                ShortDescription = shortDescription,
                LongDescription = longDescription,
                Cron = cron
            };

            //Act
            _activityCommandHandler.Handle(command, _cancellationTokenSource.Token);

            //Assert
            _repositoryMock.Verify(x => x.SaveChangesAsync(), Times.Once);
        }

        [Fact]
        public async Task UpdateActivity_WhenActivityNotExists_ShouldThrowActivityNotFoundException()
        {
            //Arrange
            var duration = 10;
            var totalCapacity = 10;
            int? leaderId = null;
            var startTime = DateTime.Now.AddDays(5);
            var endTime = DateTime.Now.AddDays(15);
            var name = "Joga";
            var shortDescription = "Short desc.";
            var longDescription = "Long desc.";
            var cron = "0 15 * * MON";
            var activityId = 15;

            var command = new UpdateActivityCommand
            {
                ActivityId = activityId,
                Duration = duration,
                TotalCapacity = totalCapacity,
                LeaderId = leaderId,
                StartTime = startTime,
                EndTime = endTime,
                Name = name,
                ShortDescription = shortDescription,
                LongDescription = longDescription,
                Cron = cron
            };

            _repositoryMock.Setup(x => x.GetActivity(It.IsAny<int>())).Returns((Domain.Activity)null);

            //Act
            var act = _activityCommandHandler.Invoking(async x => await x.Handle(command, _cancellationTokenSource.Token));

            //Assert
            await act.Should().ThrowExactlyAsync<ActivityNotFoundException>();
        }

        [Fact]
        public void DeleteActivity_ShouldSucceed()
        {
            //Arrange
            var activityId = 15;

            var command = new DeleteActivityCommand
            {
                ActivityId = activityId
            };

            //Act
            _activityCommandHandler.Handle(command, _cancellationTokenSource.Token);

            //Assert
            _repositoryMock.Verify(x => x.SaveChangesAsync(), Times.Once);
            _repositoryMock.Verify(x => x.Delete(It.IsAny<Domain.Activity>()), Times.Once);
        }

        [Fact]
        public async void DeleteActivity_WhenActivityNotExists_ShouldThrowActivityNotFoundException()
        {
            //Arrange
            var activityId = 43;

            var command = new DeleteActivityCommand
            {
                ActivityId = activityId
            };

            _repositoryMock.Setup(x => x.GetActivity(It.IsAny<int>())).Returns((Domain.Activity)null);

            // Assert
            var act = _activityCommandHandler.Invoking(async x => await x.Handle(command, _cancellationTokenSource.Token));
            await act.Should().ThrowExactlyAsync<ActivityNotFoundException>();
        }
    }
}
