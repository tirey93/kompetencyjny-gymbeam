namespace GymBeam.Exceptions
{
    public class MissingSigningKeyException : Exception
    {
        public MissingSigningKeyException() : base("JWT signing key is missing.")
        {
        }
    }
}
