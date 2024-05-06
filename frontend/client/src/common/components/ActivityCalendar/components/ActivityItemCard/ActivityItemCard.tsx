import { useCallback, useMemo } from "react";
import { Button, Paper, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconPlus, IconUsers } from "@tabler/icons-react";
import classNames from "classnames";

import { ActivityInstance } from "../../../../activities";
import { useDateTimeLocale } from "../../../../hooks";
import { useTranslate } from "../../../../i18n";
import { useAddReservation } from "../../../../reservations";
import { TextWithTooltip } from "../../../DataDisplay";

import classes from "./ActivityItemCard.module.scss";

export type ActivityItemCardProps = Pick<
    ActivityInstance,
    "slotsTaken" | "totalCapacity" | "duration" | "startTime" | "name" | "leaderName" | "activityId"
>;

export const ActivityItemCard = ({
    slotsTaken,
    startTime,
    duration,
    totalCapacity,
    name,
    leaderName,
    activityId,
}: ActivityItemCardProps) => {
    const { addReservation, isLoading: isAddReservationLoading } = useAddReservation(); // TODO: Implement add/remove reservation logic properly

    const translate = useTranslate();
    const { locale } = useDateTimeLocale();

    const localeOptions = { hour: "2-digit", minute: "2-digit" } as const;
    const endsAt = new Date(startTime.getTime() + duration * 60000);
    const hasStartedAlready = startTime < new Date();

    const reservationsDisabled = useMemo(
        () => totalCapacity === slotsTaken || hasStartedAlready,
        [hasStartedAlready, totalCapacity, slotsTaken]
    );

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

    const handleAddReservation = useCallback(async () => {
        try {
            await addReservation(1); // TODO: Handle reservations logic properly
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
    }, [addReservation, name, translate]);

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

            {reservationsDisabled ? (
                <TextWithTooltip
                    alwaysVisible
                    className={classes.reservationsDisabled}
                    label={
                        hasStartedAlready
                            ? translate("activityCalendar.item.enrollment.disabled.tooltip.tooLate")
                            : translate("activityCalendar.item.enrollment.disabled.tooltip.full")
                    }
                >
                    {translate("activityCalendar.item.enrollment.disabled.label")}
                </TextWithTooltip>
            ) : (
                <Button
                    size="xs"
                    variant="subtle"
                    color="success"
                    loading={isAddReservationLoading}
                    onClick={handleAddReservation}
                    rightSection={<IconPlus className={classes.joinIcon} />}
                >
                    {translate("activityCalendar.item.enrollment.label")}
                </Button>
            )}
        </Paper>
    );
};
