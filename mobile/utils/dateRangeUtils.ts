import dayjs from "dayjs";

export const getDateRange = (options: { length: number }) => {
    return { from: dayjs().startOf("day").toDate(), to: dayjs().endOf("day").add(options.length, "days").toDate() };
};
