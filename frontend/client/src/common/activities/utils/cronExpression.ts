import cronParser, { CronFields } from "cron-parser";
import dayjs from "dayjs";

import { Day } from "../Activities";

export const generateCronExpression = (startTimeString: string, days: Day[]) => {
    const [hour, minute] = startTimeString.split(":");
    const baseInterval = cronParser.parseExpression("* * * * *");
    const fields = JSON.parse(JSON.stringify(baseInterval.fields));

    fields.dayOfWeek = days.map((day) => parseInt(day));
    fields.hour = [parseInt(hour)];
    fields.minute = [parseInt(minute)];

    return cronParser.fieldsToExpression(fields as CronFields);
};

export const parseCronExpression = (cronExp: string) => {
    const interval = cronParser.parseExpression(cronExp);
    const fields = JSON.parse(JSON.stringify(interval.fields));

    const days = fields.dayOfWeek.map((day: number) => day.toString());
    const hour = fields.hour[0];
    const minute = fields.minute[0];
    const startHour = dayjs(0).set("minute", minute).set("hour", hour).toDate();

    return { days, startHour };
};
