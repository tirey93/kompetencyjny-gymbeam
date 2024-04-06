import { useCallback, useMemo } from "react";
import { Table, Text } from "@mantine/core";

import { useDateTimeLocale } from "../../../../hooks/useDateTimeLocale";
import { ActivityCalendarCell } from "../ActivityCalendarDay/ActivityCalendarCell";
import { ActivityItemCardProps } from "../ActivityItemCard/ActivityItemCard";

import classes from "./ActivityCalendarRow.module.scss";

type ActivityCalendarRowProps = {
    hour: number;
    days: Date[];
    activities: ActivityItemCardProps[];
};

export const ActivityCalendarRow = ({ hour, days, activities }: ActivityCalendarRowProps) => {
    const { locale } = useDateTimeLocale();

    const localeHour = useMemo(() => {
        const today = new Date();
        today.setUTCFullYear(0, 0, 0);
        today.setHours(hour, 0, 0, 0);
        return today.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
    }, [hour, locale]);

    const activitiesPerDay = useMemo(
        () =>
            days.map((day) => ({
                activities: [...activities]
                    .filter((activity) => activity.startsAt.getDate() === day.getDate())
                    .sort((a, b) => (a > b ? 1 : -1)),
                day: day,
            })),
        [days, activities]
    );

    const isCellFromThePast = useCallback((date: Date, hour: number) => {
        const day = new Date(date);
        day.setHours(hour + 1, 0, 0, 0);
        return day < new Date();
    }, []);

    return (
        <Table.Tr className={classes.row}>
            <Table.Td>
                <Text className={classes.hour}>{localeHour}</Text>
            </Table.Td>

            {activitiesPerDay.map(({ activities, day }, index) => (
                <ActivityCalendarCell
                    key={`${hour}_${index}`}
                    activities={activities}
                    disabled={isCellFromThePast(day, hour)}
                />
            ))}
        </Table.Tr>
    );
};
