import { useMemo } from "react";
import { Table } from "@mantine/core";

import { ActivityCalendarRow } from "./components/ActivityCalendarRow/ActivityCalendarRow";
import { ActivityItemCardProps } from "./components/ActivityItemCard/ActivityItemCard";
import { useCalendarDateRange } from "../../hooks/useCalendarDateRange";
import { useDateTimeLocale } from "../../hooks/useDateTimeLocale";
import { TextWithTooltip } from "../DataDisplay";

import classes from "./ActivityCalendar.module.scss";

type ActivityCalendarProps = {
    activities: ActivityItemCardProps[];
    height?: number | string;
};

export const ActivityCalendar = ({ activities, height }: ActivityCalendarProps) => {
    const { days, hours } = useCalendarDateRange();
    const { locale } = useDateTimeLocale();

    const rows = useMemo(
        () =>
            hours.map((hour) => ({
                activities: [...activities].filter((item) => item.startTime.getHours() === hour),
                hour: hour,
            })),
        [activities, hours]
    );

    return (
        <Table.ScrollContainer minWidth={600} h={height} className={classes.scrollContainer}>
            <Table stickyHeader highlightOnHover withColumnBorders className={classes.table}>
                <Table.Thead>
                    <Table.Tr className={classes.headerRow}>
                        <Table.Td>
                            <TextWithTooltip className={classes.columnName} />
                        </Table.Td>

                        {days.map((day) => (
                            <Table.Td key={day.toLocaleDateString()}>
                                <TextWithTooltip className={classes.date}>{day.toLocaleDateString()}</TextWithTooltip>
                                <TextWithTooltip className={classes.weekday}>
                                    {day.toLocaleDateString(locale, { weekday: "long" })}
                                </TextWithTooltip>
                            </Table.Td>
                        ))}
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {rows.map(({ activities, hour }) => (
                        <ActivityCalendarRow activities={activities} key={hour} hour={hour} days={days} />
                    ))}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
};
