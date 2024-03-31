using Domain;

namespace Infrastructure
{
    public class Repository : IRepository
    {
        private readonly AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext) 
        {
            _appDbContext = appDbContext;
        }

        public List<User> Users => _appDbContext.Users.ToList();

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
