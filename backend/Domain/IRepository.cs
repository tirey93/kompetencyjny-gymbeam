
namespace Domain
{
    public interface IRepository
    {
        List<User> GetUsers(Func<User, bool> predicate = null);
        User GetUser(int id);
        List<Activity> GetActivities(Func<Activity, bool> predicate = null);
        Activity GetActivity(int id);
        List<Reservation> GetReservations(Func<Reservation, bool> predicate = null);
        Reservation GetReservation(int id);
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task SaveChangesAsync();
        Dictionary<Enrollment, int> GetSlotsTakenForEnrollments(DateTime from, DateTime to);
        public User GetUserByName(string name);
        public User GetUserByPaymentId(string paymentIntentId);
    }
}