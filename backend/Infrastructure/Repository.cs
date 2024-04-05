using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class Repository : IRepository
    {
        private readonly AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public List<User> GetUsers(Func<User, bool>? predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Users.ToList();
            return _appDbContext.Users.Where(predicate).ToList();
        }
        public List<Activity> GetActivities(Func<Activity, bool>? predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Activities.Include(i => i.Leader).ToList();
            return _appDbContext.Activities.Include(i => i.Leader).Where(predicate).ToList();
        }

        public void Add<T>(T entity) where T : class
        {
            _appDbContext.Add(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _appDbContext.Remove(entity);
        }
        public T? GetById<T>(int id) where T : class
        {
            return _appDbContext.Set<T>().Find(id);
        }
        public async Task SaveChangesAsync()
        {
            await _appDbContext.SaveChangesAsync();
        }
    }
}
