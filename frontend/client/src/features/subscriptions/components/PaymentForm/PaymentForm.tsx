import { useNavigate } from "react-router-dom";
import { Button, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { PaymentElement } from "@stripe/react-stripe-js";

import classes from "./PaymentForm.module.scss";

import { ErrorMessage } from "@/components/DataDisplay";
import { useConfirmPayment } from "@/features/subscriptions/hooks/useConfirmPayment";
import { usePaymentIntent } from "@/features/subscriptions/hooks/usePaymentIntent";
import { useTranslate } from "@/lib/i18n";

type PaymentFormProps = {
    title: string;
    description: string;
    clientSecret: string;
};

export const PaymentForm = ({ title, description, clientSecret }: PaymentFormProps) => {
    const t = useTranslate();
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
                    {t("pages.payment.gymMembership.form.buttons.goBack.label")}
                </Button>
                <Button variant="light" loading={isLoading} color="success" onClick={confirmPayment}>
                    {t("pages.payment.gymMembership.form.buttons.pay.label", {
                        amount: data.amount / 100,
                        currency: data.currency.toUpperCase(),
                    })}
                </Button>
            </Group>
        </Stack>
    );
};
