using GymBeam.Responses;
using System.Net.Http.Headers;
using System.Text.Json;

namespace GymBeam.Clients
{
    public class GoogleClient
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public GoogleClient(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> GetAccessTokenAsync(string code)
        {
            var tokenResponse = await _httpClient.PostAsync("https://oauth2.googleapis.com/token", new FormUrlEncodedContent(new Dictionary<string, string>
            {
                { "code", code },
                { "client_id", _configuration["GoogleOAuth:ClientId"] },
                { "client_secret", _configuration["GoogleOAuth:ClientSecret"] },
                { "redirect_uri", _configuration["GoogleOAuth:RedirectUri"] },
                { "grant_type", "authorization_code" }
            }));

            if (!tokenResponse.IsSuccessStatusCode)
                throw new Exception("Failed to exchange authorization code for token.");

            var tokenJson = await tokenResponse.Content.ReadAsStringAsync();
            var tokenData = JsonSerializer.Deserialize<JsonElement>(tokenJson);
            return tokenData.GetProperty("access_token").GetString();
        }

        public async Task<GoogleUserResponse> GetUserInfoAsync(string accessToken)
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            var userInfoResponse = await _httpClient.GetAsync("https://www.googleapis.com/oauth2/v2/userinfo");

            if (!userInfoResponse.IsSuccessStatusCode)
                throw new Exception("Failed to fetch user information.");

            var userJson = await userInfoResponse.Content.ReadAsStringAsync();
            var userInfo = JsonSerializer.Deserialize<JsonElement>(userJson);

            return new GoogleUserResponse
            {
                Email = userInfo.GetProperty("email").GetString(),
                Name = userInfo.GetProperty("name").GetString(),
                Id = userInfo.GetProperty("id").GetString()
            };
        }
    }
}
