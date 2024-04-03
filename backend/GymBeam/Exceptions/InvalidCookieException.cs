using GymBeam.Properties;

namespace GymBeam.Exceptions
{
    public class InvalidCookieException : Exception
    {
        public InvalidCookieException(string cookieName) : base(string.Format(Resource.ExceptionCookieIsInvalid, cookieName))
        {
        }
    }
}
