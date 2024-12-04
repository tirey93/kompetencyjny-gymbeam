import { useNavigate } from "react-router-dom";
import { Button, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { IconAlertSquareRoundedFilled, IconCircleXFilled, IconRosetteDiscountCheckFilled } from "@tabler/icons-react";
import classNames from "classnames";

import styles from "./PaymentStatus.module.scss";

import { AppRoute } from "@/app/router";
import { usePaymentStatus } from "@/features/subscriptions/hooks/usePaymentStatus";

const icons = {
    loading: <Loader />,
    success: <IconRosetteDiscountCheckFilled className={classNames(styles.icon, styles.success)} />,
    warning: <IconAlertSquareRoundedFilled className={classNames(styles.icon, styles.warning)} />,
    error: <IconCircleXFilled className={classNames(styles.icon, styles.error)} />,
};

const titles = {
    loading: "Loading",
    success: "Congrats!",
    warning: "Additional steps required",
    error: "Payment failed",
};

type PaymentStatusProps = {
    clientSecret: string;
};

export const PaymentStatus = ({ clientSecret }: PaymentStatusProps) => {
    const { message, status } = usePaymentStatus(clientSecret);
    const navigate = useNavigate();

    const onGoBack = () => {
        navigate(-1);
    };

    const onGoToGymPass = () => {
        navigate(AppRoute.GYM_PASS);
    };

    return (
        <Stack className={styles.container}>
            <Group className={styles.status}>
                {icons[status]}
                <Stack className={styles.textContainer}>
                    <Title className={styles.title}>{titles[status]}</Title>
                    <Text className={styles.description}>{message}</Text>
                </Stack>
            </Group>
            {status !== "loading" && (
                <Group>
                    <Button variant="default" onClick={onGoBack}>
                        Go back
                    </Button>
                    <Button variant="light" onClick={onGoToGymPass}>
                        See gym pass
                    </Button>
                </Group>
            )}
        </Stack>
    );
};
