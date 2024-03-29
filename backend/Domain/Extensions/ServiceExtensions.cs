using Domain;
using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection;

namespace Domain.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddDomain(this IServiceCollection services)
        {
            services.AddFluentValidationAutoValidation();
        }
    }
}
