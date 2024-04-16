import { useMemo } from "react";

const INITIAL_DAY_HOUR = 0;
const NUMBER_OF_HOURS_DISPLAYED = 15;
const NUMBER_OF_DAYS_DISPLAYED = 7;

type UseCalendarDateRangeOptions = {
    initialDate?: Date;
    initialHour?: number;
    numberOfDays?: number;
    numberOfHours?: number;
};

export const useCalendarDateRange = ({
    initialDate,
    initialHour = INITIAL_DAY_HOUR,
    numberOfDays = NUMBER_OF_DAYS_DISPLAYED,
    numberOfHours = NUMBER_OF_HOURS_DISPLAYED,
}: UseCalendarDateRangeOptions = {}) => {
    const startsAt = useMemo(() => {
        const day = initialDate ?? new Date();
        day.setHours(0, 0, 0, 0);
        return day;
    }, [initialDate]);

    const days = useMemo(
        () =>
            Array.from(Array(numberOfDays).keys()).map((idx) => {
                const d = new Date();
                d.setDate(startsAt.getDate() + idx);
                return d;
            }),
        [startsAt, numberOfDays]
    );

    const hours = useMemo(
        () =>
            Array.from(Array(numberOfHours).keys()).map((idx) => {
                return initialHour + idx;
            }),
        [initialHour, numberOfHours]
    );

    const endsAt = useMemo(() => {
        const day = new Date();
        day.setDate(startsAt.getDate() + days.length);
        day.setHours(23, 59, 59);
        return day;
    }, [days.length, startsAt]);

    const dateRange = useMemo(() => ({ from: startsAt, to: endsAt }), [endsAt, startsAt]);

    return { days, hours, dateRange };
};
