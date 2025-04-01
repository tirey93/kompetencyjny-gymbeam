import React from "react";
import { View } from "react-native"; // Importuj View
import { StripeProvider } from "@stripe/stripe-react-native";

const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_STRIPE_PUBLIC_KEY; // Zastąp!

interface PaymentFormProviderProps {
    children: React.ReactNode;
}

export const PaymentFormProvider: React.FC<PaymentFormProviderProps> = ({ children }) => {
    return (
        <StripeProvider
            publishableKey={STRIPE_PUBLISHABLE_KEY as string}
            urlScheme="your-app-scheme"
            merchantIdentifier="merchant.com.yourappname"
        >
            <View>{children}</View>
        </StripeProvider>
    );
};
