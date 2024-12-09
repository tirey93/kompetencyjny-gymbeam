
using Stripe;

namespace GymBeam.Extensions
{
    public static class StripeExtensions
    {
        public static void AddStripe(this IServiceCollection services, string envVariable)
        {
            var signingKey = Environment.GetEnvironmentVariable(envVariable);
            StripeConfiguration.ApiKey = signingKey;
            services.AddSingleton<PaymentIntentService>();

        }
    }
}
