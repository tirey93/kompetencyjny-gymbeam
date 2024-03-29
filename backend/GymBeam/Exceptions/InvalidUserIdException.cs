namespace GymBeam.Exceptions
{
    public class InvalidUserIdException : Exception
    {
        public InvalidUserIdException() : base("User id is invalid.")
        {
        }
    }
}
