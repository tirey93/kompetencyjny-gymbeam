
namespace Domain
{
    public interface IRepository
    {
        List<User> GetUsers(Func<User, bool> predicate = null);
        List<Activity> GetActivities(Func<Activity, bool> predicate = null);
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        T GetById<T>(int id) where T : class;
        Task SaveChangesAsync();
    }
}