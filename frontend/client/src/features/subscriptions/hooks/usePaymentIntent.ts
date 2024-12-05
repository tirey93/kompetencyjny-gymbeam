import { useCallback } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";

import { useTranslate } from "@/lib/i18n";

export const usePaymentIntent = (clientSecret: string) => {
    const t = useTranslate();
    const stripe = useStripe();

    const retrievePaymentIntent = useCallback(async () => {
        if (!stripe) {
            throw new Error(t("apiErrors.payments.intent.default"));
        }

        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

        if (!paymentIntent) {
            throw new Error(t("apiErrors.payments.intent.default"));
        }

        return paymentIntent;
    }, [clientSecret, stripe, t]);

    return useQuery({ queryFn: retrievePaymentIntent, queryKey: [clientSecret] });
};
