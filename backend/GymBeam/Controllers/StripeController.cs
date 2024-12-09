using MediatR;
using Microsoft.AspNetCore.Mvc;
using Stripe;
namespace GymBeam.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StripeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMediator _mediator;
        private readonly ILogger<StripeController> _logger;

        public StripeController(IConfiguration configuration, IMediator mediator, ILogger<StripeController> logger)
        {
            _configuration = configuration;
            _mediator = mediator;
            _logger = logger;
        }

        [HttpPost("Webhook")]
        public async Task<IActionResult> Webhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var signatureHeader = Request.Headers["Stripe-Signature"];

            try
            {
                var webhookSecret = Environment.GetEnvironmentVariable(_configuration["StripeAuth:WebhookSigningEnvironmentVariableName"]);
                var stripeEvent = EventUtility.ConstructEvent(json, signatureHeader, webhookSecret);

                if (stripeEvent.Type == "payment_intent.succeeded")
                {
                    var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                    _logger.LogInformation($"Stripe: in payment_intent.succeeded paymentIntent.Id:{paymentIntent.Id}");
                }
            }
            catch (Exception ex)
            {

            }
            return Ok();
        }


    }

}
