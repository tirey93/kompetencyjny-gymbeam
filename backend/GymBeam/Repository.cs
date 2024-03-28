using GymBeam.Domain;

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

        public void Add<T>(T user) where T : class
        {
            _appDbContext.Add(user);
        }

        public async Task SaveChangesAsync()
        {
            await _appDbContext.SaveChangesAsync();
        }
    }
}
