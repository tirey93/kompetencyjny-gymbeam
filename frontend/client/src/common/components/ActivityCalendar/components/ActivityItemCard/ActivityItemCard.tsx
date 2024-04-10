import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Text } from "@mantine/core";
import { IconPlus, IconUsers } from "@tabler/icons-react";
import classNames from "classnames";

import { AppRoute } from "../../../../../features/router";
import { useDateTimeLocale } from "../../../../hooks/useDateTimeLocale";
import { useTranslate } from "../../../../i18n";
import { TextWithTooltip } from "../../../DataDisplay";

import classes from "./ActivityItemCard.module.scss";

export type ActivityItemCardProps = {
    startsAt: Date;
    participants: number;
    maxParticipants: number;
    duration: number;
    name: string;
    leader: string;
};

export const ActivityItemCard = ({
    participants,
    maxParticipants,
    duration,
    startsAt,
    name,
    leader,
}: ActivityItemCardProps) => {
    const navigate = useNavigate();
    const translate = useTranslate();
    const { locale } = useDateTimeLocale();
    const localeOptions = { hour: "2-digit", minute: "2-digit" } as const;
    const endsAt = new Date(startsAt.getTime() + duration * 60000);
    const hasStartedAlready = startsAt < new Date();

    const reservationsDisabled = useMemo(
        () => maxParticipants === participants || hasStartedAlready,
        [hasStartedAlready, maxParticipants, participants]
    );

    const reservationsColor = useMemo(() => {
        if (maxParticipants === participants) {
            return "danger";
        } else if (participants / maxParticipants >= 0.75) {
            return "warning";
        } else {
            return "success";
        }
    }, [maxParticipants, participants]);

    const goToActivityDetails = useCallback(() => {
        navigate(AppRoute.ACTIVITY_DETAILS.replace(":id", "1"));
    }, [navigate]);

    return (
        <Paper className={classNames(classes.calendarItem, { [classes.disabled]: hasStartedAlready })}>
            <Text className={classes.name} onClick={goToActivityDetails}>
                {name}
            </Text>

            <Text className={classes.duration}>
                {startsAt.toLocaleTimeString(locale, localeOptions)} -{" "}
                {endsAt.toLocaleTimeString(locale, localeOptions)}
            </Text>

            <Text className={classes.leader}>{leader}</Text>

            <TextWithTooltip
                alwaysEnabled
                c={reservationsColor}
                className={classes.participants}
                label={translate("activityCalendar.item.participants.tooltip", { participants })}
            >
                {participants} / {maxParticipants}
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
