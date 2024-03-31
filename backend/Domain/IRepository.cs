
namespace Domain
{
    public interface IRepository
    {
        List<User> Users { get; }
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        T GetById<T>(int id) where T : class;
        Task SaveChangesAsync();
    }
}