import { apiRequest } from "@/api";
import { ActivityDTO, ActivityInstance, AddActivityDTO } from "@/types";

export class ActivitiesService {
    public static getAllActivities(): Promise<ActivityDTO[]> {
        return apiRequest("Activity", { method: "GET" });
    }

    public static async getActivity(id: number | string): Promise<ActivityDTO> {
        return apiRequest(`Activity/${id}`, { method: "GET" });
    }

    public static async getActivityInstancesForMyself(): Promise<ActivityInstance[]> {
        return apiRequest("Enrollment/ByLoggedUser", { method: "GET" });
    }
}
