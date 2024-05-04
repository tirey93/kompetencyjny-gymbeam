import { Activity, ActivityDTO } from "../Activities";
import { parseCronExpression } from "./cronExpression";

export const mapActivityDTOToActivity = (activityDto: ActivityDTO): Activity => {
    const { days, startHour } = parseCronExpression(activityDto.cron);
    const startTime = new Date(activityDto.startTime);
    const endTime = new Date(activityDto.endTime);

    return { ...activityDto, startTime, endTime, days, startHour };
};
