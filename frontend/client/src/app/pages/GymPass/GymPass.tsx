import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, SimpleGrid, Stack, ThemeIcon } from "@mantine/core";
import { IconShield } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";

import classes from "./GymPass.module.scss";

import { AppRoute } from "@/app/router";
import { useAuthState } from "@/features/auth";
import { GymPassInfo, GymPassQR, Timestamp } from "@/features/gymPass";
import { SubscriptionsService } from "@/features/subscriptions/api/subscriptionsService";

export const GymPassPage = () => {
    const { user } = useAuthState();
    const { orderMembership, isPending } = useOrderGymMembership();

    if (!user) {
        return null;
    }

    return (
        <Stack className={classes.container}>
            <SimpleGrid cols={{ base: 1 }} className={classes.grid}>
                <Stack className={classes.qrWrapper}>
                    <Timestamp />
                    <GymPassQR qrValue={JSON.stringify(user)} />
                    <ThemeIcon className={classes.validCheck}>
                        <IconShield className={classes.validCheckIcon} />
                    </ThemeIcon>
                </Stack>
                <GymPassInfo owner={user} />
            </SimpleGrid>

            <Stack className={classes.buttonsWrapper}>
                <Button variant="default" onClick={orderMembership} loading={isPending}>
                    Order membership
                </Button>
            </Stack>
        </Stack>
    );
};

type UseOrderGymMembership = {
    orderMembership: () => void;
    isPending: boolean;
};

const useOrderGymMembership = (): UseOrderGymMembership => {
    const navigate = useNavigate();

    const retrieveOrderInformation = useCallback(async () => {
        const { clientSecret } = await SubscriptionsService.startPaymentProcess();
        navigate(AppRoute.PAYMENT, {
            state: { clientSecret },
        });
    }, [navigate]);

    const { mutateAsync, isPending } = useMutation({ mutationFn: retrieveOrderInformation });

    const orderMembership = useCallback(async () => {
        await mutateAsync();
    }, [mutateAsync]);

    return { orderMembership, isPending };
};
