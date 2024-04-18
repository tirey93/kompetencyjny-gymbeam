import { useMemo } from "react";
import { Divider, Group, Stack, Table, Text } from "@mantine/core";

import { DateRangeFilter } from "./components/ActivityCalendarFilters/DateRangeFilter/DateRangeFilter";
import { ActivityCalendarRow } from "./components/ActivityCalendarRow/ActivityCalendarRow";
import { ActivityItemCardProps } from "./components/ActivityItemCard/ActivityItemCard";
import { useCalendarDateRange, useDateTimeLocale } from "../../hooks";
import { useTranslate } from "../../i18n";
import { TextWithTooltip } from "../DataDisplay";

import classes from "./ActivityCalendar.module.scss";

type ActivityCalendarProps = {
    activities: ActivityItemCardProps[];
};

export const ActivityCalendar = ({ activities }: ActivityCalendarProps) => {
    const { days, hours, dateRange, setDateRange } = useCalendarDateRange();
    const translate = useTranslate();
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
        <Stack className={classes.calendar}>
            <Group className={classes.calendarHeader}>
                <Text className={classes.calendarHeaderTitle}>{translate("activityCalendar.header.title")}</Text>
                <Divider orientation="vertical" className={classes.calendarHeaderDivider} />
                <DateRangeFilter value={dateRange} onChange={setDateRange} />
            </Group>

            <Table.ScrollContainer minWidth={600} className={classes.scrollContainer}>
                <Table stickyHeader highlightOnHover withColumnBorders className={classes.table}>
                    <Table.Thead>
                        <Table.Tr className={classes.headerRow}>
                            <Table.Td>
                                <TextWithTooltip className={classes.columnName} />
                            </Table.Td>

                            {days.map((day) => (
                                <Table.Td key={day.toLocaleDateString()}>
                                    <TextWithTooltip className={classes.date}>
                                        {day.toLocaleDateString()}
                                    </TextWithTooltip>
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
        </Stack>
    );
};
