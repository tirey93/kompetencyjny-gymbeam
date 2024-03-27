using GymBeam.Constants;
using GymBeam.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/********************************************************/
var issuer = builder.Configuration["JWT:Issuer"];
var audience = builder.Configuration["JWT:Audience"];
var envVariable = builder.Configuration["JWT:EnvironmentSecretVariableName"];
var allowedOrigin = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

builder.Services.AddJWTAuthentication(issuer, audience, envVariable);
builder.Services.AddCors(allowedOrigin);


/********************************************************/
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(Config.Cors);

app.MapControllers();

app.Run();
