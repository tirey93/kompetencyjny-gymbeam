using GymBeam.Constants;
using GymBeam.Extensions;
using GymBeam.Clients;
using System.Reflection;
using Infrastructure.Extensions;
using FluentValidation.AspNetCore;
using Stripe;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/********************************************************/
var issuer = builder.Configuration["JWT:Issuer"];
var audience = builder.Configuration["JWT:Audience"];
var envVariable = builder.Configuration["JWT:EnvironmentSecretVariableName"];
var stripeEnvVariable = builder.Configuration["StripeAuth:ApiKeyEnvironmentVariableName"];
var allowedOrigin = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();
var fileName = builder.Configuration.GetConnectionString("WebApiDatabase");

builder.Services.AddJWTAuthentication(issuer, audience, envVariable);
builder.Services.AddStripe(stripeEnvVariable);
builder.Services.AddInfrastructure(fileName);
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
builder.Services.AddCors(allowedOrigin);
builder.Services.AddFluentValidation();
builder.Services.AddHttpClient<GoogleClient>();


/********************************************************/
var app = builder.Build();

app.UseCors(Config.Cors);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
