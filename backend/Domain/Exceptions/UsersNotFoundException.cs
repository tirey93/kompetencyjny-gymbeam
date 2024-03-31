namespace Domain.Exceptions
{
    public class UsersNotFoundException : DomainException
    {
        public UsersNotFoundException() : base("Users not found in the database.") { }
    }

}
