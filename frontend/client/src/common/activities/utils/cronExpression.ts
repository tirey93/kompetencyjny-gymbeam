import cronParser, { CronFields } from "cron-parser";
import dayjs from "dayjs";

import { Day } from "../Activities";

export const generateCronExpression = (startTimeString: string, days: Day[]) => {
    const [hour, minute] = startTimeString.split(":");
    const baseInterval = cronParser.parseExpression("* * * * *");
    const fields = JSON.parse(JSON.stringify(baseInterval.fields));

    const startTimeInMinutes = parseInt(hour) * 60 + parseInt(minute) + new Date().getTimezoneOffset();
    const adjustedHour = Math.floor(startTimeInMinutes / 60);
    const adjustedMinute = startTimeInMinutes % 60;

    fields.dayOfWeek = days.map((day) => parseInt(day));
    fields.hour = [adjustedHour];
    fields.minute = [adjustedMinute];

    return cronParser.fieldsToExpression(fields as CronFields);
};

export const parseCronExpression = (cronExp: string) => {
    const interval = cronParser.parseExpression(cronExp);
    const fields = JSON.parse(JSON.stringify(interval.fields));

    const days = fields.dayOfWeek.map((day: number) => day.toString());
    const startHour = dayjs(interval.next().toDate())
        .add(-1 * new Date().getTimezoneOffset(), "minutes")
        .toDate();

    return { days, startHour };
};
