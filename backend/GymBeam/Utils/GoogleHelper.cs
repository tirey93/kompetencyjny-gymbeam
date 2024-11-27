
namespace GymBeam.Utils
{
    public static class GoogleHelper
    {
        public static string GetGoogleLoginLink(this IConfiguration configuration)
        {
            var googleOAuthUri = "https://accounts.google.com/o/oauth2/v2/auth";

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
    }
}