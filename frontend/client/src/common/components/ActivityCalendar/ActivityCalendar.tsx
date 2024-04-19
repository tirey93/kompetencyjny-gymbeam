import { useMemo, useState } from "react";
import { Group, Stack, Table } from "@mantine/core";

import { ActivitiesSelect } from "./components/ActivityCalendarFilters/ActivitiesSelect/ActivitiesSelect";
import { DateRangeFilter } from "./components/ActivityCalendarFilters/DateRangeFilter/DateRangeFilter";
import { DateRangeSwitch } from "./components/ActivityCalendarFilters/DateRangeSwitch/DateRangeSwitch";
import { ActivityCalendarRow } from "./components/ActivityCalendarRow/ActivityCalendarRow";
import { Activity, ActivityInstance } from "../../activities/Activities";
import { useCalendarDateRange, useDateTimeLocale } from "../../hooks";
import { TextWithTooltip } from "../DataDisplay";
import { Logo } from "../Logo";

import classes from "./ActivityCalendar.module.scss";

type ActivityCalendarProps = {
    activityInstances: ActivityInstance[];
    activities: Activity[];
    withFilters?: boolean;
};

export const ActivityCalendar = ({ activityInstances, activities, withFilters }: ActivityCalendarProps) => {
    const { days, hours, dateRange, setDateRange } = useCalendarDateRange();
    const [displayedActivities, setDisplayedActivities] = useState<Activity[]>([]);
    const { locale } = useDateTimeLocale();

    const filteredActivityInstances = useMemo(() => {
        if (!displayedActivities.length) {
            return activityInstances;
        } else {
            const displayedActivitiesIds = displayedActivities.map(({ id }) => id);
            return activityInstances.filter((instance) => displayedActivitiesIds.includes(instance.activityId));
        }
    }, [activityInstances, displayedActivities]);

    const rows = useMemo(
        () =>
            hours.map((hour) => ({
                activities: [...filteredActivityInstances].filter((item) => item.startTime.getHours() === hour),
                hour: hour,
            })),
        [filteredActivityInstances, hours]
    );

    return (
        <Stack className={classes.calendar}>
            {withFilters && (
                <Group className={classes.calendarHeader}>
                    <Logo size="xl" logoSize={35} variant="light" withName />
                    <Group>
                        <ActivitiesSelect
                            options={activities}
                            value={displayedActivities}
                            onChange={setDisplayedActivities}
                        />
                        <DateRangeFilter value={dateRange} onChange={setDateRange} />
                    </Group>
                </Group>
            )}

            <Table.ScrollContainer minWidth={600} className={classes.scrollContainer}>
                <Table stickyHeader highlightOnHover withColumnBorders className={classes.table}>
                    <Table.Thead>
                        <Table.Tr className={classes.headerRow}>
                            <Table.Td>
                                <DateRangeSwitch onChange={setDateRange} value={dateRange} />
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
