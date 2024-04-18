import { useCallback, useState } from "react";
import { Group } from "@mantine/core";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

import { DateRange } from "../../../../../hooks/useCalendarDateRange";

import classes from "./DateRangeFilter.module.scss";

type ActivityCalendarFilters = {
    value: DateRange;
    onChange: (value: DateRange) => unknown;
};

export const DateRangeFilter = ({ value, onChange }: ActivityCalendarFilters) => {
    const [internalDateRange, setInternalDateRange] = useState<DatesRangeValue>([value.from, value.to]);

    const handleDateRangeChange = useCallback(
        (newValue: DatesRangeValue) => {
            const [from, to] = newValue;

            if (from) {
                setInternalDateRange(newValue);
            } else {
                setInternalDateRange([value.from, value.to]);
            }

            if (from && to) {
                onChange({ from, to });
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
