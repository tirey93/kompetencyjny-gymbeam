using Domain;

namespace GymBeam
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

        public async Task SaveChangesAsync()
        {
            await _appDbContext.SaveChangesAsync();
        }
    }
}
