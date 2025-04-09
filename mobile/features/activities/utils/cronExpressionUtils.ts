import cronParser from "cron-parser";
import dayjs from "dayjs";

export const parseCronExpression = (cronExp: string) => {
    const interval = cronParser.parseExpression(cronExp);
    const fields = JSON.parse(JSON.stringify(interval.fields));

    // For some reason cronParser finds 8 days in a week
    const days =
        fields.dayOfWeek.length > 7
            ? ["0", "1", "2", "3", "4", "5", "6"]
            : fields.dayOfWeek.map((day: number) => day.toString());

    const startHour = dayjs(interval.next().toDate())
        .add(-1 * new Date().getTimezoneOffset(), "minutes")
        .toDate();

    return { days, startHour };
};
