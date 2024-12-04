import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { PaymentElement, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";

import classes from "./PaymentForm.module.scss";

import { ErrorMessage } from "@/components/DataDisplay";
import { useConfirmPayment } from "@/features/subscriptions/hooks/useConfirmPayment";

type PaymentFormProps = {
    title: string;
    description: string;
    clientSecret: string;
};

export const PaymentForm = ({ title, description, clientSecret }: PaymentFormProps) => {
    const { confirmPayment, error, reset, isLoading } = useConfirmPayment();
    const { data, error: orderError } = usePaymentIntent(clientSecret);

    const navigate = useNavigate();

    const onGoBack = () => {
        navigate(-1);
    };

    if (orderError) {
        return orderError.message;
    }

    if (!data) {
        return <Loader />;
    }

    return (
        <Stack className={classes.container}>
            <Title order={3}>{title}</Title>
            <Text className={classes.caption}>{description}</Text>
            <Stack>
                <PaymentElement
                    options={{
                        layout: {
                            type: "accordion",
                            defaultCollapsed: true,
                            spacedAccordionItems: false,
                            radios: true,
                        },
                    }}
                />

                {error && <ErrorMessage onClose={reset}>{error.message}</ErrorMessage>}
            </Stack>

            <Group className={classes.buttonsContainer}>
                <Button variant="default" onClick={onGoBack}>
                    Go back
                </Button>
                <Button variant="light" loading={isLoading} color="success" onClick={confirmPayment}>
                    Pay {data.amount / 100} {data.currency}
                </Button>
            </Group>
        </Stack>
    );
};

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
