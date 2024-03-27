using System.IdentityModel.Tokens.Jwt;

namespace GymBeam.Extensions
{
    public static class CookiesExtensions
    {
        public static IResponseCookies AppendToCookie(this IResponseCookies cookies, string key, string value)
        {
            cookies.Append(key,
               value,
               new CookieOptions()
               {
                   HttpOnly = true,
                   SameSite = SameSiteMode.Strict
               });
            return cookies;
        }
    }
}
