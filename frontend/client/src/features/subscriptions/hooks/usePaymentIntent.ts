import { useCallback } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";

export const usePaymentIntent = (clientSecret: string) => {
    const stripe = useStripe();

    const retrievePaymentIntent = useCallback(async () => {
        if (!stripe) {
            throw new Error("Stripe is not initialized.");
        }

        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

        if (!paymentIntent) {
            throw new Error("Could not retrieve order info.");
        }

        return paymentIntent;
    }, [clientSecret, stripe]);

    return useQuery({ queryFn: retrievePaymentIntent, queryKey: [clientSecret] });
};
