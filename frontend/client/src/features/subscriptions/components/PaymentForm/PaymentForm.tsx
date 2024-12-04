import { useNavigate } from "react-router-dom";
import { Button, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { PaymentElement } from "@stripe/react-stripe-js";

import classes from "./PaymentForm.module.scss";

import { ErrorMessage } from "@/components/DataDisplay";
import { useConfirmPayment } from "@/features/subscriptions/hooks/useConfirmPayment";
import { usePaymentIntent } from "@/features/subscriptions/hooks/usePaymentIntent";

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
                    Pay {data.amount / 100} {data.currency.toUpperCase()}
                </Button>
            </Group>
        </Stack>
    );
};
