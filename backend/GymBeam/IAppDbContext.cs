using GymBeam.Domain;
using Microsoft.EntityFrameworkCore;

namespace GymBeam
{
    public interface IAppDbContext
    {
        DbSet<User> Users { get; set; }
        void AddEntity<T>(T user) where T : class;
        Task SaveAsync();
    }
}