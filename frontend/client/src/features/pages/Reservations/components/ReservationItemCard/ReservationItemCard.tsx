import { useCallback } from "react";
import { ActionIcon, Group, Loader, Paper, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCalendar, IconClock, IconSchool, IconUsersGroup, IconX } from "@tabler/icons-react";
import classNames from "classnames";

import { ActivityInstance } from "../../../../../common/activities";
import { useDateTimeLocale } from "../../../../../common/hooks";
import { useTranslate } from "../../../../../common/i18n";
import { useRemoveReservation } from "../../../../../common/reservations";

import classes from "./ReservationItemCard.module.scss";

export type ReservationItemCardProps = Pick<
    ActivityInstance,
    "slotsTaken" | "totalCapacity" | "duration" | "startTime" | "name" | "leaderName" | "activityId" | "reservationId"
>;

export const ReservationItemCard = ({
    slotsTaken,
    startTime,
    duration,
    totalCapacity,
    name,
    leaderName,
    activityId,
    reservationId,
}: ReservationItemCardProps) => {
    const { locale } = useDateTimeLocale();
    const translate = useTranslate();
    const { removeReservation, isLoading } = useRemoveReservation();

    const localeOptions = { hour: "2-digit", minute: "2-digit" } as const;
    const endsAt = new Date(startTime.getTime() + duration * 60000);

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

    const handleRemoveReservation = useCallback(async () => {
        try {
            if (!reservationId) {
                return; // TODO: This should never happen, find a cleaner way to handle this
            }

            await removeReservation(reservationId);

            notifications.show({
                withBorder: true,
                color: "success",
                title: translate("notifications.reservations.remove.success.title"),
                message: translate("notifications.reservations.remove.success.description", {
                    activity: name,
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
    }, [name, removeReservation, reservationId, translate]);

    return (
        <Paper className={classNames(classes.reservationItem)}>
            <Group className={classes.header}>
                <Text className={classes.name} onClick={() => openActivityDetailsModal(activityId)}>
                    {name}
                </Text>

                {isLoading ? (
                    <Loader className={classes.resignButton} size="sm" />
                ) : (
                    <ActionIcon
                        variant="subtle"
                        color="danger"
                        className={classes.resignButton}
                        onClick={handleRemoveReservation}
                    >
                        <IconX />
                    </ActionIcon>
                )}
            </Group>

            <Group className={classes.details}>
                <Group className={classes.detail}>
                    <IconUsersGroup className={classes.icon} />
                    <Text className={classes.value}>
                        {slotsTaken} / {totalCapacity}
                    </Text>
                </Group>

                <Group className={classes.detail}>
                    <IconCalendar className={classes.icon} />
                    <Text className={classes.value}>{startTime.toLocaleDateString(locale)}</Text>
                </Group>

                <Group className={classes.detail}>
                    <IconClock className={classes.icon} />
                    <Text className={classes.value}>
                        {startTime.toLocaleTimeString(locale, localeOptions)} -{" "}
                        {endsAt.toLocaleTimeString(locale, localeOptions)}
                    </Text>
                </Group>

                <Group className={classes.detail}>
                    <IconSchool className={classes.icon} />
                    <Text className={classes.value}>{leaderName}</Text>
                </Group>
            </Group>
        </Paper>
    );
};
