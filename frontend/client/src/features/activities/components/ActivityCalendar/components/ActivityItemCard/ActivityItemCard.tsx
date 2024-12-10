import { useCallback } from "react";
import { Paper, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import classNames from "classnames";

import { ActivitySlotsInfo } from "./components/ActivitySlotsInfo/ActivitySlotsInfo";
import { ReservationButton } from "./components/ReservationButton/ReservationButton";

import classes from "./ActivityItemCard.module.scss";

import { useAuthState } from "@/features/auth";
import { useAddReservation, useRemoveReservation } from "@/features/reservations";
import { useDateTimeLocale } from "@/hooks";
import { useTranslate } from "@/lib/i18n";
import { ActivityInstance } from "@/types";

export type ActivityItemCardProps = Pick<
    ActivityInstance,
    "slotsTaken" | "totalCapacity" | "duration" | "startTime" | "name" | "leaderName" | "activityId" | "reservationId"
>;

export const ActivityItemCard = ({
    slotsTaken,
    startTime,
    duration,
    totalCapacity,
    name,
    leaderName,
    activityId,
    reservationId,
}: ActivityItemCardProps) => {
    const user = useAuthState().user;
    const { addReservation, isLoading: isAddReservationLoading } = useAddReservation();
    const { removeReservation, isLoading: isRemoveReservationLoading } = useRemoveReservation();

    const translate = useTranslate();
    const { locale } = useDateTimeLocale();

    const localeOptions = { hour: "2-digit", minute: "2-digit" } as const;
    const endsAt = new Date(startTime.getTime() + duration * 60000);
    const hasStartedAlready = startTime < new Date();
    const isFull = totalCapacity === slotsTaken;

    const openActivityDetailsModal = useCallback(() => {
        modals.openContextModal({
            modal: "activityDetails",
            centered: true,
            withCloseButton: false,
            innerProps: {
                activityId,
            },
        });
    }, [activityId]);

    const openReservationsModal = useCallback(
        () =>
            modals.openContextModal({
                modal: "showReservations",
                centered: true,
                withCloseButton: false,
                innerProps: {
                    type: "ReservationsForActivity",
                    activityId,
                    startTime,
                },
            }),
        [activityId, startTime]
    );

    const handleRemoveReservation = useCallback(async () => {
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

    const handleAddReservation = useCallback(async () => {
        try {
            if (!user) {
                throw new Error();
            }

            await addReservation({ activityId, userId: user.id, startTime: startTime.toISOString() });

            notifications.show({
                withBorder: true,
                color: "success",
                title: translate("notifications.reservations.add.success.title"),
                message: translate("notifications.reservations.add.success.description", {
                    activity: name,
                }),
            });
        } catch (error) {
            const message = (error as Error)?.message ?? "";
            notifications.show({
                withBorder: true,
                color: "danger",
                title: translate("notifications.reservations.add.error.title"),
                message,
            });
        }
    }, [activityId, addReservation, name, startTime, translate, user]);

    return (
        <Paper className={classNames(classes.calendarItem, { [classes.disabled]: hasStartedAlready })}>
            <Text className={classes.name} onClick={openActivityDetailsModal}>
                {name}
            </Text>

            <Text className={classes.duration}>
                {startTime.toLocaleTimeString(locale, localeOptions)} -{" "}
                {endsAt.toLocaleTimeString(locale, localeOptions)}
            </Text>

            <Text className={classes.leader}>{leaderName}</Text>

            <ActivitySlotsInfo
                slotsTaken={slotsTaken}
                totalCapacity={totalCapacity}
                onClick={user?.role === "Admin" ? openReservationsModal : undefined}
            />

            <ReservationButton
                activityDate={startTime}
                user={user}
                onReservation={handleAddReservation}
                onCancellation={handleRemoveReservation}
                isAlreadyReserved={!!reservationId}
                isLoading={isAddReservationLoading || isRemoveReservationLoading}
                isFull={isFull}
            />
        </Paper>
    );
};
