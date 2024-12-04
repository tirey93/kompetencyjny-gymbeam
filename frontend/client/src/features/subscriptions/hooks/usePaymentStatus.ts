import { useCallback, useEffect, useState } from "react";

import { usePaymentIntent } from "@/features/subscriptions/components/PaymentForm/PaymentForm";

type PaymentIntentResult = {
    status: "loading" | "error" | "success" | "warning";
    message: string;
};

export const usePaymentStatus = (clientSecret: string): PaymentIntentResult => {
    const { data: paymentIntent, isLoading } = usePaymentIntent(clientSecret);

    const [paymentIntentResult, setPaymentIntentResult] = useState<PaymentIntentResult>({
        status: "loading",
        message: "Loading...",
    });

    const getPaymentIntentResult = useCallback(async (): Promise<PaymentIntentResult> => {
        if (isLoading) {
            return { status: "loading", message: "We are processing your payment." };
        }

        if (!paymentIntent) {
            return { status: "error", message: "Failed to retrieve payment information." };
        }

        const status = paymentIntent?.status;

        switch (status) {
            case "processing":
                return { status: "loading", message: "We are processing your payment." };

            case "succeeded":
                return { status: "success", message: "Payment succeeded!" };

            case "canceled":
                return { status: "error", message: "Payment canceled." };

            case "requires_action":
            case "requires_payment_method":
            case "requires_confirmation":
            case "requires_capture":
                return { status: "warning", message: "Payment requires some action." };

            default:
                throw new Error("Unknown payment status!");
        }
    }, [isLoading, paymentIntent]);

    useEffect(() => {
        const updatePaymentStatus = async () => {
            setPaymentIntentResult(await getPaymentIntentResult());
        };

        void updatePaymentStatus();
    }, [getPaymentIntentResult]);

    return paymentIntentResult;
};
