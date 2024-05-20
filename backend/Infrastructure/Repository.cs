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
        public User? GetUser(int id)
        {
            return _appDbContext.Users.FirstOrDefault(x => x.Id == id);
        }

        public List<Activity> GetActivities(Func<Activity, bool>? predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Activities.Include(i => i.Leader).ToList();
            return _appDbContext.Activities.Include(i => i.Leader).Where(predicate).ToList();
        }

        public Activity? GetActivity(int id)
        {
            return _appDbContext.Activities.Include(i => i.Leader).FirstOrDefault(x => x.Id == id);
        }
        public List<Reservation> GetReservations(Func<Reservation, bool>? predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Reservations
                    .Include(u => u.User)
                    .Include(a => a.Activity)
                    .ToList();
            return _appDbContext.Reservations
                .Include(u => u.User)
                .Include(a => a.Activity)
                .Where(predicate)
                .ToList();
        }
        
        public Dictionary<Enrollment, int> GetSlotsTakenForEnrollments(DateTime from, DateTime to)
        {
            return _appDbContext.Reservations
                .Where(x => x.StartTime >= from && x.StartTime <= to)
                .GroupBy(r => new { ActivityId = r.Activity.Id, r.StartTime })
                .Select(g => new
                {
                    g.Key.ActivityId,
                    g.Key.StartTime,
                    SlotsTaken = g.Count()
                })
                .ToDictionary(x => new Enrollment { ActivityId = x.ActivityId, StartTime = x.StartTime }, y => y.SlotsTaken);
        }

        public Reservation? GetReservation(int id)
        {
            return _appDbContext.Reservations
                .Include(u => u.User)
                .Include(a => a.Activity)
                .FirstOrDefault(x => x.Id == id);
        }

        public void Add<T>(T entity) where T : class
        {
            _appDbContext.Add(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _appDbContext.Remove(entity);
        }
        public async Task SaveChangesAsync()
        {
            await _appDbContext.SaveChangesAsync();
        }
    }
}
