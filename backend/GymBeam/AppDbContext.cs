using GymBeam.Domain;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace GymBeam
{
    public class AppDbContext : DbContext, IAppDbContext
    {
        public DbSet<User> Users { get; set; }
        public List<User> UserList => Users.ToList();

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        public void AddEntity<T>(T user) where T : class
        {
            Add(user);
        }

        public async Task SaveAsync()
        {
            await SaveChangesAsync();
        }
    }
}
