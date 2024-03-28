using GymBeam.Domain;

namespace GymBeam
{
    public interface IAppDbContext
    {
        List<User> UserList { get; }
        void AddEntity<T>(T user) where T : class;
        Task SaveAsync();
    }
}