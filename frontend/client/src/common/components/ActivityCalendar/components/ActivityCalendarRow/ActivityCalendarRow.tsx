import { useCallback, useMemo } from "react";
import { Table, Text } from "@mantine/core";
import dayjs from "dayjs";

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
                    .filter((activity) => activity.startTime.getDate() === day.getDate())
                    .sort((a, b) => (a > b ? 1 : -1)),
                day: day,
            })),
        [days, activities]
    );

    const isCellFromThePast = useCallback((_date: Date, _hour: number) => {
        return dayjs(_date).set("hours", _hour).isBefore(dayjs());
    }, []);

    return (
        <Table.Tr className={classes.row}>
            <Table.Td className={classes.hourCell}>
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
