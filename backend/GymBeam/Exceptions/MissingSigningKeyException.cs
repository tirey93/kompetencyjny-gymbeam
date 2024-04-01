using GymBeam.Properties;

namespace GymBeam.Exceptions
{
    public class MissingSigningKeyException : Exception
    {
        public MissingSigningKeyException() : base(Resource.ExceptionSigningKeyIsMissing)
        {
        }
    }
}
