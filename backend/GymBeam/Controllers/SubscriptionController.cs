using MediatR;
using GymBeam.Properties;
using GymBeam.Queries;
using GymBeam.Requests;
using GymBeam.Response;
using GymBeam.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Stripe;
namespace GymBeam.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SubscriptionController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMediator _mediator;
        private readonly PaymentIntentService _paymentIntentService;
        private readonly ILogger<SubscriptionController> _logger;

        public SubscriptionController(IConfiguration configuration, IMediator mediator, PaymentIntentService paymentIntentService, ILogger<SubscriptionController> logger)
        {
            _configuration = configuration;
            _mediator = mediator;
            _paymentIntentService = paymentIntentService;
            _logger = logger;
        }
        [HttpPost("PaymentIntent")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<ActionResult> Post(int userId)
        {
            try
            {
                var options = new PaymentIntentCreateOptions
                {
                    Description = $"userId={userId}",
                    Currency = "pln",
                    Amount = 1099,
                    AutomaticPaymentMethods = new()
                    {
                        Enabled = true,
                    }
                };

                var paymentIntent = await _paymentIntentService.CreateAsync(options);
                _logger.LogWarning($"in POST paymentIntent.Id:{paymentIntent.Id}");
                return Ok(new {clientSecret = paymentIntent.ClientSecret });
            }
             catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
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
                    _logger.LogWarning($"in WEBHOOK.payment_intent.succeeded paymentIntent.Id:{paymentIntent.Id}");
                }
            }
            catch (Exception ex)
            {

            }
            return Ok();
        }


    }

}
