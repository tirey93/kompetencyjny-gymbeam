import { Group, Paper, Text } from "@mantine/core";
import { IconCalendar, IconClock, IconSchool, IconUsersGroup } from "@tabler/icons-react";
import classNames from "classnames";

import classes from "./ReservationItemCard.module.scss";

import { ReservationItemCardHeader } from "@/features/reservations";
import { useDateTimeLocale } from "@/hooks";
import { ActivityInstance } from "@/types";

export type ReservationItemCardProps = ReservationItemCardFields & {
    onDismiss?: () => unknown;
    isLoading?: boolean;
    onShowDetails?: () => unknown;
};

export type ReservationItemCardFields = RequiredReservationFields & Partial<OptionalReservationFields>;

type OptionalReservationFields = Pick<ActivityInstance, "slotsTaken" | "totalCapacity" | "duration">;
type RequiredReservationFields = Pick<
    ActivityInstance,
    "startTime" | "name" | "leaderName" | "activityId" | "reservationId"
>;

export const ReservationItemCard = ({
    slotsTaken,
    startTime,
    duration,
    totalCapacity,
    name,
    leaderName,
    isLoading,
    onDismiss,
    onShowDetails,
}: ReservationItemCardProps) => {
    const { locale } = useDateTimeLocale();

    const localeOptions = { hour: "2-digit", minute: "2-digit" } as const;
    const endsAt = duration ? new Date(startTime.getTime() + duration * 60000) : null;

    return (
        <Paper className={classNames(classes.reservationItem)}>
            <ReservationItemCardHeader
                header={name}
                isLoading={isLoading}
                onDismiss={onDismiss}
                onShowDetails={onShowDetails}
            />

            <Group className={classes.details}>
                {!!(slotsTaken && totalCapacity) && (
                    <Group className={classes.detail}>
                        <IconUsersGroup className={classes.icon} />
                        <Text className={classes.value}>
                            {slotsTaken} / {totalCapacity}
                        </Text>
                    </Group>
                )}

                <Group className={classes.detail}>
                    <IconCalendar className={classes.icon} />
                    <Text className={classes.value}>{startTime.toLocaleDateString(locale)}</Text>
                </Group>

                <Group className={classes.detail}>
                    <IconClock className={classes.icon} />
                    <Text className={classes.value}>
                        {endsAt
                            ? `${startTime.toLocaleTimeString(locale, localeOptions)} - ${endsAt.toLocaleTimeString(locale, localeOptions)}`
                            : `${startTime.toLocaleTimeString(locale, localeOptions)}`}
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
