import { useCallback } from "react";
import { ActionIcon, Group, Paper, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCalendar, IconClock, IconSchool, IconUsersGroup, IconX } from "@tabler/icons-react";
import classNames from "classnames";

import { ActivityInstance } from "../../../../../common/activities";
import { useDateTimeLocale } from "../../../../../common/hooks";

import classes from "./ReservationItemCard.module.scss";

export type ReservationItemCardProps = Pick<
    ActivityInstance,
    "slotsTaken" | "totalCapacity" | "duration" | "startTime" | "name" | "leaderName" | "activityId"
>;

export const ReservationItemCard = ({
    slotsTaken,
    startTime,
    duration,
    totalCapacity,
    name,
    leaderName,
    activityId,
}: ReservationItemCardProps) => {
    const { locale } = useDateTimeLocale();
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

    return (
        <Paper className={classNames(classes.reservationItem)}>
            <Group className={classes.header}>
                <Text className={classes.name} onClick={() => openActivityDetailsModal(activityId)}>
                    {name}
                </Text>

                <ActionIcon variant="subtle" color="danger" className={classes.resignButton}>
                    <IconX />
                </ActionIcon>
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
