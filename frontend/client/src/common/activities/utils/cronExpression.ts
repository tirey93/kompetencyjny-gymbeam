import cronParser, { CronFields } from "cron-parser";

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
