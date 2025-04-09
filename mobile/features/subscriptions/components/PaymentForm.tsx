import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";

//import { usePaymentIntent } from "@/features/subscriptions/hooks/usePaymentIntent"; // Usuwamy ten import
//import { useConfirmPayment } from "@/features/subscriptions/hooks/useConfirmPayment"; // Usuwamy ten import
// Dostosuj ścieżkę

type PaymentFormProps = {
    title: string;
    description: string;
    clientSecret: string;
};

export const PaymentForm: React.FC<PaymentFormProps> = ({ title, description, clientSecret }) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const navigation = useNavigation();

    const handleGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const initializePaymentSheet = useCallback(async () => {
        if (!clientSecret) {
            console.warn("clientSecret is missing!");
            return;
        }
        console.log("initializePaymentSheet");
        try {
            const { error } = await initPaymentSheet({
                paymentIntentClientSecret: clientSecret,
                merchantDisplayName: "Merchant name",
            });

            if (error) {
                console.error("Error initializing Payment Sheet:", error);
                setPaymentError(error.message);
            } else {
                setPaymentError(null); // Clear any previous error
            }
        } catch (e) {
            console.error("Exception initializing Payment Sheet:", e);
            setPaymentError("Failed to initialize payment sheet.");
        }
    }, [clientSecret, initPaymentSheet]);

    const handlePresentPaymentSheet = useCallback(async () => {
        setLoading(true);
        setPaymentError(null); // Clear any previous error

        try {
            const { error } = await presentPaymentSheet();

            if (error) {
                console.error("Error presenting Payment Sheet:", error);
                setPaymentError(error.message || "Payment failed.");
                Alert.alert("Payment Error", error.message || "Payment failed."); // Show error
            } else {
                Alert.alert("Success", "Your payment was confirmed!");
                // Optionally navigate to a success screen
            }
        } catch (e) {
            console.error("Exception presenting Payment Sheet:", e);
            setPaymentError("An unexpected error occurred.");
            Alert.alert("Payment Error", "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    }, [presentPaymentSheet]);

    // Initialize Payment Sheet when the component mounts and clientSecret is available
    useEffect(() => {
        initializePaymentSheet();
    }, [initializePaymentSheet]);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>

            {paymentError && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{paymentError}</Text>
                </View>
            )}

            <View style={styles.buttonsContainer}>
                <Button title={"Go back"} onPress={handleGoBack} />
                <Button
                    title={loading ? "Loading" : "Pay 10 USD"}
                    onPress={handlePresentPaymentSheet}
                    disabled={loading || !clientSecret}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        gap: 10,
        marginTop: 30,
    },
    container: {
        flex: 1,
        marginTop: 50,
        padding: 30,
    },
    description: {
        color: "#FFFFFF",
        fontSize: 16,
        marginBottom: 20,
    },
    errorContainer: {
        backgroundColor: "#FFBABA",
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
    },
    errorText: {
        color: "#D8000C",
    },
    title: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
});
