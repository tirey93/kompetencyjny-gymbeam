﻿using GymBeam.Constants;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace GymBeam.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddJWTAuthentication(this IServiceCollection services, string issuer, string audience, string envVariable)
        {
            var signingKey = Environment.GetEnvironmentVariable(envVariable);

            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = issuer,
                    ValidateAudience = true,
                    ValidAudience = audience,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey))
                };
                options.Events = new JwtBearerEvents()
                {
                    // WSO2 sends the JWT in a different field than what is expected.
                    // This allows us to feed it in.
                    OnMessageReceived = context =>
                    {
                        if (context.Request.Cookies.ContainsKey("X-Access-Token"))
                        {
                            context.Token = context.Request.Cookies["X-Access-Token"];
                        }
                        return Task.CompletedTask;
                    }
                };
            });
        }

        public static void AddCors(this IServiceCollection services, string[] allowedOrigin)
        {
            services.AddCors(options => {
                options.AddPolicy(Config.Cors, policy => {
                    policy.WithOrigins(allowedOrigin)
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
        }
    }
}
