import { useCallback } from "react";
import { Divider, Group, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { ReservationItemCardFields, ReservationItemCardProps } from "../ReservationItemCard/ReservationItemCard";

import classes from "./ReservationsSection.module.scss";

import { useRemoveReservation } from "@/features/reservations";
import { useTranslate } from "@/lib/i18n";

type ReservationsSectionProps = {
    onItemRender: (props: ReservationItemCardProps) => JSX.Element;
    items: ReservationItemCardFields[];
    label?: string;
};

export const ReservationsSection = ({ items, label, onItemRender }: ReservationsSectionProps) => {
    const translate = useTranslate();
    const { removeReservation, isLoading } = useRemoveReservation();

    const handleRemoveReservation = useCallback(
        async (reservationId: number, activityName: string) => {
            try {
                if (!reservationId) {
                    throw new Error();
                }

                await removeReservation(reservationId);

                notifications.show({
                    withBorder: true,
                    color: "success",
                    title: translate("notifications.reservations.remove.success.title"),
                    message: translate("notifications.reservations.remove.success.description", {
                        activity: activityName,
                    }),
                });
            } catch (error) {
                const message = (error as Error)?.message ?? "";
                notifications.show({
                    withBorder: true,
                    color: "danger",
                    title: translate("notifications.reservations.remove.error.title"),
                    message,
                });
            }
        },
        [removeReservation, translate]
    );

    const openActivityDetailsModal = useCallback((activityId: number) => {
        modals.openContextModal({
            modal: "activityDetails",
            centered: true,
            withCloseButton: false,
            innerProps: {
                activityId,
            },
        });
    }, []);

    return (
        <Stack className={classes.container}>
            {label && <Divider className={classes.divider} label={label} />}

            {items.length ? (
                <Group className={classes.reservationsGroup}>
                    {items.map((item) =>
                        onItemRender({
                            isLoading,
                            onDismiss: () => handleRemoveReservation(item.reservationId!, item.name),
                            onShowDetails: () => openActivityDetailsModal(item.activityId),
                            ...item,
                        })
                    )}
                </Group>
            ) : (
                <Text className={classes.emptyMessage}>{translate("pages.reservations.sections.empty")}</Text>
            )}
        </Stack>
    );
};
