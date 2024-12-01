using Domain.Exceptions;
using GymBeam.Properties;


namespace GymBeam.Utils
{
    public static class GoogleHelper
    {
        public static string GetGoogleLoginLink(this IConfiguration configuration)
        {
            var googleOAuthUri = configuration["GoogleOAuth:AuthUri"];
            var clientId = configuration["GoogleOAuth:ClientId"];
            var redirectUri = configuration["GoogleOAuth:RedirectUri"];
            var state = Guid.NewGuid().ToString();
            var scope = "openid email profile";

            return $"{googleOAuthUri}?response_type=code" +
                   $"&client_id={Uri.EscapeDataString(clientId)}" +
                   $"&redirect_uri={Uri.EscapeDataString(redirectUri)}" +
                   $"&scope={Uri.EscapeDataString(scope)}" +
                   $"&state={Uri.EscapeDataString(state)}";
        }

        public static string GetGoogleOAuthSecret(this IConfiguration configuration)
        {
            var EnvironmentVariableName = configuration["GoogleOAuth:EnvironmentSecretVariableName"];
            string secret = Environment.GetEnvironmentVariable(EnvironmentVariableName);

            if (string.IsNullOrEmpty(secret))
            {
                throw new AuthenticationFailureException(Resource.ExceptionNoOAuthSecretInEnvVariables);
            }

            return secret;
        }
    }
}