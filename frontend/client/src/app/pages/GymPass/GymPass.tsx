import { Button, SimpleGrid, Stack, ThemeIcon } from "@mantine/core";
import { IconShield } from "@tabler/icons-react";

import classes from "./GymPass.module.scss";

import { ErrorMessage } from "@/components/DataDisplay";
import { useAuthState, useUpdateSignedInUser } from "@/features/auth";
import { GymPassInfo, GymPassQR, Timestamp } from "@/features/gymPass";
import { useOrderMembership } from "@/features/subscriptions/hooks/useOrderMembership";
import { useTranslate } from "@/lib/i18n";

export const GymPassPage = () => {
    const { orderMembership, isPending } = useOrderMembership();
    const t = useTranslate();
    const { user } = useAuthState();

    // Hack to update user details after the payment gets processed. We don't know when it is processed if the user doesn't wait for the payments status to update, though.
    useUpdateSignedInUser({ force: true });

    if (!user) {
        return null;
    }

    return (
        <Stack className={classes.container}>
            <SimpleGrid cols={{ base: 1 }} className={classes.grid}>
                <Stack className={classes.qrWrapper}>
                    <Timestamp />
                    <GymPassQR qrValue={JSON.stringify(user)} />

                    {!!user.gymPassExpirationTime && (
                        <ThemeIcon className={classes.validCheck}>
                            <IconShield className={classes.validCheckIcon} />
                        </ThemeIcon>
                    )}

                    {!user.gymPassExpirationTime && (
                        <div className={classes.backdrop}>
                            <div className={classes.backdropContent}>
                                <ErrorMessage>{t("pages.qr.errors.expired")}</ErrorMessage>
                            </div>
                        </div>
                    )}
                </Stack>
                <GymPassInfo owner={user} />
            </SimpleGrid>

            <Stack className={classes.buttonsWrapper}>
                <Button variant="default" onClick={orderMembership} loading={isPending}>
                    {user.gymPassExpirationTime
                        ? t("pages.qr.extendMembershipButton.label")
                        : t("pages.qr.orderMembershipButton.label")}
                </Button>
            </Stack>
        </Stack>
    );
};
