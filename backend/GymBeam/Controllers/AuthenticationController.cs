using Domain.Exceptions;
using GymBeam.Commands;
using GymBeam.Constants;
using GymBeam.Exceptions;
using GymBeam.Extensions;
using GymBeam.Properties;
using GymBeam.Queries;
using GymBeam.Requests;
using GymBeam.Response;
using GymBeam.Utils;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text.Json;
using System.Net.Http.Headers;

namespace GymBeam.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMediator _mediator;

        public AuthenticationController(IConfiguration configuration, IMediator mediator)
        {
            _configuration = configuration;
            _mediator = mediator;
        }

        [HttpGet("google")]
        public IActionResult GetGoogleLoginLink()
        {
            var googleOAuthUri = "https://accounts.google.com/o/oauth2/v2/auth";

            var clientId = _configuration["GoogleOAuth:ClientId"];
            var redirectUri = _configuration["GoogleOAuth:RedirectUri"];
            var state = Guid.NewGuid().ToString();

            var scope = "openid email profile";

            var loginLink = $"{googleOAuthUri}?response_type=code" +
                            $"&client_id={Uri.EscapeDataString(clientId)}" +
                            $"&redirect_uri={Uri.EscapeDataString(redirectUri)}" +
                            $"&scope={Uri.EscapeDataString(scope)}" +
                            $"&state={Uri.EscapeDataString(state)}";

            return Ok(new { link = loginLink });
        }


        [HttpGet("google/callback")]
        public async Task<IActionResult> GoogleCallback([FromQuery] string code)
        {
            // Validate the authorization code
            if (string.IsNullOrEmpty(code))
                return BadRequest("Authorization code not provided.");

            using var client = new HttpClient();

            // Exchange the authorization code for an access token
            var tokenResponse = await client.PostAsync("https://oauth2.googleapis.com/token", new FormUrlEncodedContent(new Dictionary<string, string>
            {
                { "code", code },
                { "client_id", _configuration["GoogleOAuth:ClientId"] },
                { "client_secret", _configuration["GoogleOAuth:ClientSecret"] },
                { "redirect_uri", _configuration["GoogleOAuth:RedirectUri"] },
                { "grant_type", "authorization_code" }
            }));

            if (!tokenResponse.IsSuccessStatusCode)
                return BadRequest("Failed to exchange authorization code for token.");

            // Parse the token response
            var tokenJson = await tokenResponse.Content.ReadAsStringAsync();
            var tokenData = JsonSerializer.Deserialize<JsonElement>(tokenJson);
            var accessToken = tokenData.GetProperty("access_token").GetString();

            // Use the access token to retrieve user information
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            var userInfoResponse = await client.GetAsync("https://www.googleapis.com/oauth2/v2/userinfo");

            if (!userInfoResponse.IsSuccessStatusCode)
                return BadRequest("Failed to fetch user information.");

            // Parse the user information response
            var userJson = await userInfoResponse.Content.ReadAsStringAsync();
            var userInfo = JsonSerializer.Deserialize<JsonElement>(userJson);

            // Extract relevant user details
            var email = userInfo.GetProperty("email").GetString();
            var name = userInfo.GetProperty("name").GetString();
            var id = userInfo.GetProperty("id").GetString();

            // Log and return user details
            Console.WriteLine($"User Info: Email = {email}, Name = {name}, Id = {id}");

            return Ok(new { email, name, id });
        }

        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [AllowAnonymous]
        public async Task<ActionResult<UserResponse>> Register([FromBody] RegisterRequest dto)
        {
            var command = new RegisterCommand
            {
                DisplayName = dto.DisplayName,
                Password = dto.Password,
                Username = dto.Username,
            };

            try
            {
                var response = await _mediator.Send(command);
                AppendToCookie(response);
                return Ok(response);
            }
            catch (UserAlreadyExistsException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [AllowAnonymous]
        public async Task<ActionResult<UserResponse>> Login([FromBody] LoginRequest dto)
        {
            var query = new LoginQuery
            {
                Password = dto.Password,
                Username = dto.Username
            };
            try
            {
                var response = await _mediator.Send(query);
                AppendToCookie(response);

                return Ok(new UserResponse
                {
                    Id = response.Id,
                    Name = response.Name,
                    DisplayName = response.DisplayName,
                    Role = response.Role,
                    ReservationDisabled = response.ReservationDisabled
                });
            }
            catch (UserNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (PasswordNotMatchException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpPost("Logout")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public IActionResult Logout()
        {
            try
            {
                Response.Cookies.Delete(Cookies.UserId, new CookieOptions()
                {
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    HttpOnly = true,
                    MaxAge = new TimeSpan(12, 0, 0),
                    Domain = "localhost"
                });
                Response.Cookies.Delete(Cookies.AccessToken, new CookieOptions()
                {
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    HttpOnly = true,
                    MaxAge = new TimeSpan(12, 0, 0),
                    Domain = "localhost"
                });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        private void AppendToCookie(UserResponse response)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, response.Role)
            };

            var signingKey = Environment.GetEnvironmentVariable(_configuration["JWT:EnvironmentSecretVariableName"]);
            if (string.IsNullOrEmpty(signingKey))
                throw new MissingSigningKeyException();

            var token = JwtHelper.GetJwtToken(
                response.Name,
                signingKey,
                _configuration["JWT:Issuer"],
                _configuration["JWT:Audience"],
                TimeSpan.FromMinutes(24 * 60),
                claims.ToArray());

            Response.Cookies
                .AppendToCookie(Cookies.AccessToken, new JwtSecurityTokenHandler().WriteToken(token))
                .AppendToCookie(Cookies.UserId, response.Id.ToString());
        }
    }
}