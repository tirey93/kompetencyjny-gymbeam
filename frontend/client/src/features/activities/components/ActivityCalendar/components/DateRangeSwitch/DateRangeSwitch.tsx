import { useCallback } from "react";
import { ActionIcon, Group } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import dayjs from "dayjs";

import { DateRange } from "@/hooks/useCalendarDateRange/useCalendarDateRange";

type ActivityCalendarFilters = {
    value: DateRange;
    onChange: (value: DateRange) => unknown;
};

export const DateRangeSwitch = ({ value, onChange }: ActivityCalendarFilters) => {
    const calculateNewDateRange = useCallback(({ from, to }: DateRange, operation: "increment" | "decrement") => {
        const multiplier = operation === "increment" ? 1 : -1;
        const timespan = dayjs(to).diff(dayjs(from), "days") * multiplier;
        const newFrom = dayjs(from).add(timespan, "days").toDate();
        const newTo = dayjs(to).add(timespan, "days").toDate();
        return { from: newFrom, to: newTo };
    }, []);

    const decrementDateRange = useCallback(() => {
        onChange(calculateNewDateRange(value, "decrement"));
    }, [calculateNewDateRange, onChange, value]);

    const incrementDateRange = useCallback(() => {
        onChange(calculateNewDateRange(value, "increment"));
    }, [calculateNewDateRange, onChange, value]);

    return (
        <Group>
            <ActionIcon
                variant="light"
                color="secondary"
                disabled={value.from < new Date()}
                onClick={decrementDateRange}
            >
                <IconChevronLeft />
            </ActionIcon>
            <ActionIcon variant="light" color="secondary" onClick={incrementDateRange}>
                <IconChevronRight />
            </ActionIcon>
        </Group>
    );
};
