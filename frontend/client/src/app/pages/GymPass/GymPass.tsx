import { Button, SimpleGrid, Stack, ThemeIcon } from "@mantine/core";
import { IconShield } from "@tabler/icons-react";

import classes from "./GymPass.module.scss";

import { useAuthState } from "@/features/auth";
import { GymPassInfo, GymPassQR, Timestamp } from "@/features/gymPass";
import { useOrderMembership } from "@/features/subscriptions/hooks/useOrderMembership";

export const GymPassPage = () => {
    const { user } = useAuthState();
    const { orderMembership, isPending } = useOrderMembership();

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
