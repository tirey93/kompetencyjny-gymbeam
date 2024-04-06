import { useMemo } from "react";

type UseCalendarDateRangeOptions = {
    initialDate?: Date;
    initialHour?: number;
    numberOfDays?: number;
    numberOfHours?: number;
};

export const useCalendarDateRange = ({
    initialDate,
    initialHour = 8,
    numberOfDays = 7,
    numberOfHours = 15,
}: UseCalendarDateRangeOptions = {}) => {
    const firstDay = useMemo(() => {
        const day = initialDate ?? new Date();
        day.setHours(0, 0, 0, 0);
        return day;
    }, [initialDate]);

    const days = useMemo(
        () =>
            Array.from(Array(numberOfDays).keys()).map((idx) => {
                const d = new Date();
                d.setDate(firstDay.getDate() + idx);
                return d;
            }),
        [firstDay, numberOfDays]
    );

    const hours = useMemo(
        () =>
            Array.from(Array(numberOfHours).keys()).map((idx) => {
                return initialHour + idx;
            }),
        [initialHour, numberOfHours]
    );

    return { days, hours };
};
