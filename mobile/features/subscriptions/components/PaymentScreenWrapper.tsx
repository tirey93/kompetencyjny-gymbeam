import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { initStripe } from "@stripe/stripe-react-native";

interface Props {
    onInit?(): void;
    children?: React.ReactNode;
}

const PaymentScreenWrapper: React.FC<Props> = ({ children, onInit }) => {
    const [loading, setLoading] = useState(true);
    const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY;
    console.log("PaymentScreenWrapper", publishableKey);
    useEffect(() => {
        async function initialize() {
            if (publishableKey) {
                await initStripe({
                    publishableKey,
                    merchantIdentifier: "merchant.com.stripe.react.native",
                    urlScheme: "com.stripe.react.native",
                    setReturnUrlSchemeOnAndroid: true,
                });
                setLoading(false);
                onInit?.();
            }
        }
        initialize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading ? (
        <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
    ) : (
        <ScrollView accessibilityLabel="payment-screen" keyboardShouldPersistTaps="always">
            {children}
        </ScrollView>
    );
};



export default PaymentScreenWrapper;
