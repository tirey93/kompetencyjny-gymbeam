using Domain;

namespace GymBeam
{
    public interface IRepository
    {
        List<User> Users { get; }
        void Add<T>(T entity) where T : class;
        Task SaveChangesAsync();
    }
}