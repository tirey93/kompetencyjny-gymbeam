import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Text } from "@mantine/core";
import { IconPlus, IconUsers } from "@tabler/icons-react";
import classNames from "classnames";

import { AppRoute } from "../../../../../features/router";
import { ActivityInstance } from "../../../../activities/Activities";
import { useDateTimeLocale } from "../../../../hooks/useDateTimeLocale";
import { useTranslate } from "../../../../i18n";
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
    const navigate = useNavigate();
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

    const goToActivityDetails = useCallback(() => {
        navigate(AppRoute.ACTIVITY_DETAILS.replace(":id", activityId.toString()));
    }, [activityId, navigate]);

    return (
        <Paper className={classNames(classes.calendarItem, { [classes.disabled]: hasStartedAlready })}>
            <Text className={classes.name} onClick={goToActivityDetails}>
                {name}
            </Text>

            <Text className={classes.duration}>
                {startTime.toLocaleTimeString(locale, localeOptions)} -{" "}
                {endsAt.toLocaleTimeString(locale, localeOptions)}
            </Text>

            <Text className={classes.leader}>{leaderName}</Text>

            <TextWithTooltip
                alwaysEnabled
                c={reservationsColor}
                className={classes.participants}
                label={translate("activityCalendar.item.participants.tooltip", { slotsTaken })}
            >
                {slotsTaken} / {totalCapacity}
                <IconUsers className={classes.participantsIcon} />
            </TextWithTooltip>

            {reservationsDisabled ? (
                <TextWithTooltip
                    alwaysEnabled
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
                    rightSection={<IconPlus className={classes.joinIcon} />}
                >
                    {translate("activityCalendar.item.enrollment.label")}
                </Button>
            )}
        </Paper>
    );
};
