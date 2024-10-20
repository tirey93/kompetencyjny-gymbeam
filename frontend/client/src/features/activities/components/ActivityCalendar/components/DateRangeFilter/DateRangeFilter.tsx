import { useCallback, useEffect, useState } from "react";
import { Group } from "@mantine/core";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

import classes from "./DateRangeFilter.module.scss";

import { DateRange } from "@/hooks/useCalendarDateRange/useCalendarDateRange";

type ActivityCalendarFilters = {
    value: DateRange;
    onChange: (value: DateRange) => unknown;
};

export const DateRangeFilter = ({ value, onChange }: ActivityCalendarFilters) => {
    const [internalDateRange, setInternalDateRange] = useState<DatesRangeValue>([value.from, value.to]);

    useEffect(() => {
        setInternalDateRange([value.from, value.to]);
    }, [value]);

    const handleDateRangeChange = useCallback(
        ([from, to]: DatesRangeValue) => {
            if (!from) {
                return setInternalDateRange([value.from, value.to]);
            } else {
                setInternalDateRange([from, to]);

                if (to) {
                    onChange({ from, to });
                }
            }
        },
        [onChange, value.from, value.to]
    );

    return (
        <Group className={classes.container}>
            <DatePickerInput
                type="range"
                dropdownType="modal"
                minDate={new Date()}
                value={internalDateRange}
                onChange={handleDateRangeChange}
                leftSection={<IconCalendar className={classes.icon} />}
            />
        </Group>
    );
};
