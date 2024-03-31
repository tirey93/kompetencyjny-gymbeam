using Domain;

namespace GymBeam.Exceptions
{
    public class InvalidCookieException : Exception
    {
        public InvalidCookieException(string cookieName) : base($"Cookie {cookieName} was not found.")
        {
        }
    }
}
