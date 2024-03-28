using GymBeam.Domain;

namespace GymBeam
{
    public interface IRepository
    {
        List<User> Users { get; }
        void Add<T>(T user) where T : class;
        Task SaveChangesAsync();
    }
}