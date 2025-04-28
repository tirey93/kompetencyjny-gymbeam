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
using GymBeam.Clients;
using Domain;
using GymBeam.Responses;

namespace GymBeam.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMediator _mediator;
        private readonly GoogleClient _googleClient;

        public AuthenticationController(IConfiguration configuration, IMediator mediator, GoogleClient googleClient)
        {
            _configuration = configuration;
            _mediator = mediator;
            _googleClient = googleClient;
        }

        [HttpGet("google")]
        [AllowAnonymous]
        public IActionResult GetGoogleLoginLink()
        {
            var loginLink = _configuration.GetGoogleLoginLink();
            return Ok(new { link = loginLink });
        }

        [HttpGet("google/callback")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [AllowAnonymous]
        public async Task<IActionResult> GoogleCallback([FromQuery] string code)
        {
            if (string.IsNullOrEmpty(code))
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    Resource.ValidatorAuthorizationCodeNotProvided);

            GoogleUserResponse userInfo = null;
            UserResponse userResponse;
            try
            {
                var accessToken = await _googleClient.GetAccessTokenAsync(code);
                userInfo = await _googleClient.GetUserInfoAsync(accessToken);

                var user = await _mediator.Send(new GetUserByNameQuery
                {
                    Username = userInfo.Email
                });

                userResponse = await _mediator.Send(new LoginQuery
                {
                    Username = user.Name,
                    Password = null
                });
            }
            catch (UserNotFoundException ex)
            {
                if (userInfo != null)
                {
                    userResponse = await _mediator.Send(new RegisterCommand
                    {
                        DisplayName = userInfo.Name,
                        Username = userInfo.Email,
                        Password = null
                    });
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.BadRequest,
                        Resource.ExceptionFailedToFetchUserInfo);
                }
            }
            catch (AuthenticationFailureException ex)
            {
                return StatusCode((int)HttpStatusCode.Forbidden,
                    string.Format(Resource.ControllerForbidden, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
            var redirectUrl = Uri.UnescapeDataString(_configuration["GoogleOAuth:ReturnUrl"]);

            var token = generateJwtToken(userResponse);
            var authToken = new JwtSecurityTokenHandler().WriteToken(token);
            var userId = userResponse.Id.ToString();

            redirectUrl = $"{redirectUrl}?authToken={authToken}&userId={userId}";
            return Redirect(redirectUrl);
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

                return Ok(response);
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

        private JwtSecurityToken generateJwtToken(UserResponse response)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, response.Role)
            };

            var signingKey = Environment.GetEnvironmentVariable(_configuration["JWT:EnvironmentSecretVariableName"]);
            if (string.IsNullOrEmpty(signingKey))
                throw new MissingSigningKeyException();

            return JwtHelper.GetJwtToken(
                response.Name,
                signingKey,
                _configuration["JWT:Issuer"],
                _configuration["JWT:Audience"],
                TimeSpan.FromMinutes(24 * 60),
                claims.ToArray());
        }
    }
}