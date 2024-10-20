import { useMemo, useState } from "react";
import dayjs from "dayjs";

const INITIAL_NUMBER_OF_DAYS_OFFSET = 1;
const INITIAL_NUMBER_OF_DAYS = 7 - INITIAL_NUMBER_OF_DAYS_OFFSET;
const INITIAL_DAY_HOUR = 8;
const NUMBER_OF_HOURS_DISPLAYED = 24 - INITIAL_DAY_HOUR;

export type DateRange = {
    from: Date;
    to: Date;
};

type UseCalendarDateRangeOptions = {
    initialDate?: Date;
    initialHour?: number;
    initialNumberOfDays?: number;
    numberOfHours?: number;
};

export type UseCalendarDateRange = {
    days: Date[];
    hours: number[];
    dateRange: DateRange;
    setDateRange: (value: DateRange) => void;
};

export const useCalendarDateRange = ({
    initialHour = INITIAL_DAY_HOUR,
    numberOfHours = NUMBER_OF_HOURS_DISPLAYED,
}: UseCalendarDateRangeOptions = {}): UseCalendarDateRange => {
    const [dateRange, setDateRange] = useState<DateRange>(getDefaultDateRange(INITIAL_NUMBER_OF_DAYS));

    const days = useMemo(() => {
        const rangeEnd = dayjs(dateRange.to).startOf("day");
        const rangeStart = dayjs(dateRange.from).startOf("day");
        const numberOfDays = rangeEnd.diff(rangeStart, "days") + INITIAL_NUMBER_OF_DAYS_OFFSET;
        return Array.from(Array(numberOfDays).keys()).map((idx) => dayjs(dateRange.from).add(idx, "days").toDate());
    }, [dateRange.from, dateRange.to]);

    const hours = useMemo(
        () =>
            Array.from(Array(numberOfHours).keys()).map((idx) => {
                return initialHour + idx;
            }),
        [initialHour, numberOfHours]
    );

    return { days, hours, dateRange, setDateRange };
};

const getDefaultDateRange = (days: number): DateRange => {
    const from = dayjs().startOf("day").startOf("day").toDate();
    const to = dayjs(from).add(days, "days").endOf("day").toDate();

    return { from, to };
};
