import dayjs from "dayjs";

import { request } from "@/api";
import { DateRange } from "@/hooks/useCalendarDateRange/useCalendarDateRange";
import { ActivityDTO, ActivityInstance, AddActivityDTO } from "@/types";

export class ActivitiesService {
    public static getAllActivities(): Promise<ActivityDTO[]> {
        return request("Activity", { method: "GET" });
    }

    public static async getActivity(id: number | string): Promise<ActivityDTO> {
        return request(`Activity/${id}`, { method: "GET" });
    }

    public static async addActivity(dto: AddActivityDTO): Promise<void> {
        return request("Activity", { method: "POST", body: dto });
    }

    public static async updateActivity(dto: ActivityDTO): Promise<void> {
        return request(`Activity/${dto.id}`, { method: "PUT", body: dto });
    }

    public static async deleteActivity(id: number | string): Promise<void> {
        return request(`Activity/${id}`, { method: "DELETE" });
    }

    public static async getActivityInstancesByDates({ from, to }: DateRange): Promise<ActivityInstance[]> {
        return request("Enrollment/ByDates", {
            method: "GET",
            queryParams: { from: from.toISOString(), to: dayjs(to).endOf("day").toISOString() },
        });
    }

    public static async getActivityInstancesForMyself(): Promise<ActivityInstance[]> {
        return request("Enrollment/ByLoggedUser", { method: "GET" });
    }
}
