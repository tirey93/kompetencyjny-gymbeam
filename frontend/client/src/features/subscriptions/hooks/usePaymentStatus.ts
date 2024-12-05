import { useCallback, useEffect, useState } from "react";

import { usePaymentIntent } from "@/features/subscriptions/hooks/usePaymentIntent";
import { useTranslate } from "@/lib/i18n";

type PaymentIntentResult = {
    status: "loading" | "error" | "success" | "warning";
    message: string;
};

export const usePaymentStatus = (clientSecret: string): PaymentIntentResult => {
    const t = useTranslate();
    const { data: paymentIntent, isLoading } = usePaymentIntent(clientSecret);

    const [paymentIntentResult, setPaymentIntentResult] = useState<PaymentIntentResult>({
        status: "loading",
        message: t("notifications.payments.status.loading.waitingForInitialization"),
    });

    const getPaymentIntentResult = useCallback(async (): Promise<PaymentIntentResult> => {
        if (isLoading) {
            return { status: "loading", message: t("notifications.payments.status.loading.processing") };
        }

        if (!paymentIntent) {
            return { status: "error", message: t("notifications.payments.status.error.default") };
        }

        const status = paymentIntent?.status;

        switch (status) {
            case "processing":
                return { status: "loading", message: t("notifications.payments.status.loading.processing") };

            case "succeeded":
                return { status: "success", message: t("notifications.payments.status.success.default") };

            case "canceled":
                return { status: "error", message: t("notifications.payments.status.error.canceled") };

            case "requires_action":
            case "requires_payment_method":
            case "requires_confirmation":
            case "requires_capture":
                return { status: "warning", message: t("notifications.payments.status.warning.actionRequired") };

            default:
                throw new Error(t("notifications.payments.status.error.unknownStatus"));
        }
    }, [isLoading, paymentIntent, t]);

    useEffect(() => {
        const updatePaymentStatus = async () => {
            setPaymentIntentResult(await getPaymentIntentResult());
        };

        void updatePaymentStatus();
    }, [getPaymentIntentResult]);

    return paymentIntentResult;
};
