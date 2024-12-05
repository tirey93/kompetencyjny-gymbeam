import { PropsWithChildren } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementLocale } from "@stripe/stripe-js";

import { stripePromise } from "@/features/subscriptions/lib/stripePromise";
import { getLanguage } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export const PaymentFormProvider = ({ children, clientSecret }: PropsWithChildren<{ clientSecret: string }>) => {
    const { theme } = useTheme();

    return (
        <Elements
            stripe={stripePromise}
            options={{
                locale: (getLanguage() as StripeElementLocale) ?? "auto",
                clientSecret,
                appearance: {
                    theme: "night",
                    variables: { colorBackground: theme.colors?.dark?.[7] },
                },
            }}
        >
            {children}
        </Elements>
    );
};
