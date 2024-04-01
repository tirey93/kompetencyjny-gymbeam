using GymBeam.Properties;

namespace GymBeam.Exceptions
{
    public class InvalidUserIdException : Exception
    {
        public InvalidUserIdException() : base(Resource.ExceptionUserIdIsInvalid)
        {
        }
    }
}
