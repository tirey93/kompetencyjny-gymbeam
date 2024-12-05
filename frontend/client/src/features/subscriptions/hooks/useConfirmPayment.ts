import { useCallback } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";

import { AppRoute } from "@/app/router";

type UseConfirmPayment = {
    error?: StripeError;
    confirmPayment: () => void;
    isLoading: boolean;
    reset: () => void;
};

export const useConfirmPayment = (): UseConfirmPayment => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = useCallback(async () => {
        if (!stripe || !elements) {
            return;
        }

        return await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}${AppRoute.PAYMENT_STATUS}`,
            },
        });
    }, [elements, stripe]);

    const {
        mutateAsync,
        data,
        isPending: isLoading,
        reset,
    } = useMutation({
        mutationFn: handleSubmit,
    });

    return { error: data?.error, confirmPayment: mutateAsync, isLoading, reset };
};
