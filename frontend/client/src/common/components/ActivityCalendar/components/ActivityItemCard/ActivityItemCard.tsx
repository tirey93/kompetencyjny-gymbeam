import { useCallback, useMemo } from "react";
import { Paper, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconUsers } from "@tabler/icons-react";
import classNames from "classnames";

import { ActivityInstance } from "../../../../activities";
import { useAuthState } from "../../../../auth";
import { useDateTimeLocale } from "../../../../hooks";
import { useTranslate } from "../../../../i18n";
import { useAddReservation, useRemoveReservation } from "../../../../reservations";
import { TextWithTooltip } from "../../../DataDisplay";
import { ReservationButton } from "./ReservationButton";

import classes from "./ActivityItemCard.module.scss";

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

    const reservationsColor = useMemo(() => {
        if (totalCapacity === slotsTaken) {
            return "danger";
        } else if (slotsTaken / totalCapacity >= 0.75) {
            return "warning";
        } else {
            return "success";
        }
    }, [totalCapacity, slotsTaken]);

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

    const handleAddReservation = useCallback(async () => {
        try {
            if (!user) {
                return; // TODO: This should never happen, find a cleaner way to handle this
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
            <Text className={classes.name} onClick={() => openActivityDetailsModal(activityId)}>
                {name}
            </Text>

            <Text className={classes.duration}>
                {startTime.toLocaleTimeString(locale, localeOptions)} -{" "}
                {endsAt.toLocaleTimeString(locale, localeOptions)}
            </Text>

            <Text className={classes.leader}>{leaderName}</Text>

            <TextWithTooltip
                alwaysVisible
                c={reservationsColor}
                className={classes.participants}
                label={translate("activityCalendar.item.participants.tooltip", { slotsTaken })}
            >
                {slotsTaken} / {totalCapacity}
                <IconUsers className={classes.participantsIcon} />
            </TextWithTooltip>

            <ReservationButton
                onReservation={handleAddReservation}
                onCancellation={handleRemoveReservation}
                isAlreadyReserved={!!reservationId}
                isLoading={isAddReservationLoading || isRemoveReservationLoading}
                hasStartedAlready={hasStartedAlready}
                isFull={isFull}
            />
        </Paper>
    );
};
