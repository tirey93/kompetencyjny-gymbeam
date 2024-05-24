import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Group, Stack, Table } from "@mantine/core";

import { ActivitiesSelect } from "./components/ActivityCalendarFilters/ActivitiesSelect/ActivitiesSelect";
import { DateRangeFilter } from "./components/ActivityCalendarFilters/DateRangeFilter/DateRangeFilter";
import { DateRangeSwitch } from "./components/ActivityCalendarFilters/DateRangeSwitch/DateRangeSwitch";
import { ActivityCalendarRow } from "./components/ActivityCalendarRow/ActivityCalendarRow";
import { Activity, ActivityInstance } from "../../activities";
import { useDateTimeLocale } from "../../hooks";
import { UseCalendarDateRange } from "../../hooks/useCalendarDateRange";
import { LoaderOverlay, TextWithTooltip } from "../DataDisplay";
import { Logo } from "../Logo";

import classes from "./ActivityCalendar.module.scss";

type ActivityCalendarProps = {
    activityInstances: ActivityInstance[];
    dateRangeOptions: UseCalendarDateRange;
    activities: Activity[];
    withFilters?: boolean;
    isLoading?: boolean;
};

export const ActivityCalendar = ({
    activityInstances,
    activities,
    withFilters,
    dateRangeOptions,
    isLoading,
}: ActivityCalendarProps) => {
    const { days, hours, dateRange, setDateRange } = dateRangeOptions;
    const { locale } = useDateTimeLocale();
    const { state } = useLocation();
    const uniqueActivitiesNames = [...new Set(activities.map(({ name }) => name))];
    const [activityNamesToFilter, setActivityNamesToFilter] = useState<string[]>(
        state?.filteredActivityName ? [state.filteredActivityName] : []
    );

    const filteredActivityInstances = useMemo(() => {
        if (!activityNamesToFilter.length) {
            return activityInstances;
        } else {
            return activityInstances.filter((instance) => activityNamesToFilter.includes(instance.name));
        }
    }, [activityInstances, activityNamesToFilter]);

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
                            onChange={setActivityNamesToFilter}
                            options={uniqueActivitiesNames}
                            value={activityNamesToFilter}
                        />
                        <DateRangeFilter value={dateRange} onChange={setDateRange} />
                    </Group>
                </Group>
            )}

            <Table.ScrollContainer minWidth={600} className={classes.scrollContainer}>
                {isLoading && <LoaderOverlay />}

                <Table stickyHeader highlightOnHover withColumnBorders className={classes.table}>
                    <Table.Thead>
                        <Table.Tr className={classes.headerRow}>
                            <Table.Td className={classes.dateRangeSwitch}>
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
