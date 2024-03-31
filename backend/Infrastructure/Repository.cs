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
        public T GetById<T>(int id) where T : class
        {
            var entity = _appDbContext.Set<T>().Find(id);
            if (entity == null)
            {
                return null;
            }
            return entity;
        }
        public async Task SaveChangesAsync()
        {
            await _appDbContext.SaveChangesAsync();
        }
    }
}
