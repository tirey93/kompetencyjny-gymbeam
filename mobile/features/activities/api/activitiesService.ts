import { apiRequest } from "@/api";
import { parseCronExpression } from "@/features/activities/utils/cronExpressionUtils";
import { Activity, ActivityDTO, ActivityInstance } from "@/types";
import { DateRange } from "@/types/Common";

export class ActivitiesService {
    public static async getAllActivities(): Promise<Activity[]> {
        const result = await apiRequest("Activity", { method: "GET" });
        return (result ?? []).map(ActivitiesService.mapActivityDTOToActivity);
    }

    public static async getActivity(id: number | string): Promise<ActivityDTO> {
        return apiRequest(`Activity/${id}`, { method: "GET" });
    }

    public static async getActivityInstancesByDates({ from, to }: DateRange): Promise<ActivityInstance[]> {
        return apiRequest("Enrollment/ByDates", {
            method: "GET",
            queryParams: { from: from.toISOString(), to: to.toISOString() },
        });
    }

    public static async getActivityInstancesForMyself(): Promise<ActivityInstance[]> {
        return apiRequest("Enrollment/ByLoggedUser", { method: "GET" });
    }

    private static mapActivityDTOToActivity(activityDto: ActivityDTO): Activity {
        const { days, startHour } = parseCronExpression(activityDto.cron);
        const startTime = new Date(activityDto.startTime);
        const endTime = new Date(activityDto.endTime);

        return { ...activityDto, startTime, endTime, days, startHour };
    }
}
