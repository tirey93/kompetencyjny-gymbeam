﻿using GymBeam.Requests;
using GymBeam.Response;
using Microsoft.AspNetCore.Mvc;

namespace GymBeam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        [HttpPost("Register")]
        public ActionResult<UserResponse> Register([FromBody] UserRequest dto)
        {
            return new UserResponse
            {
                Id = 34,
                Username = dto.Username,
                DisplayName = dto.DisplayName,
                Role = dto.Role
            };
        }

        [HttpPost("Login")]
        public ActionResult<UserResponse> Login([FromBody] LoginRequest dto)
        {
            return new UserResponse
            {
                Id = 25,
                Username = dto.Username,
                DisplayName = "testDisplayName",
                Role = "User"
            };
        }

        [HttpPost("Logout/User/{id:int}")]
        public IActionResult Logout(int id)
        {
            return NoContent();
        }
    }
}