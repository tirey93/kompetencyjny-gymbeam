import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner-native";

import { HttpErrorsMap, mapErrorToErrorMessage } from "@/api";
import { ActivitiesService } from "@/features/activities/api/activitiesService";
import { ActivitiesQueryKeyFactory } from "@/features/activities/utils/acivitiesQueryKeyFactory";

type UseActivitiesInstancesOptions =
    | {
          type: "ReservedByUser";
      }
    | {
          type: "ByDateRange";
          dateRange: { from: Date; to: Date };
      };

export const useActivitiesInstances = (options: UseActivitiesInstancesOptions) => {
    const queryKey =
        options.type === "ReservedByUser"
            ? ActivitiesQueryKeyFactory.createForOwnInstances()
            : ActivitiesQueryKeyFactory.createForInstancesByDateRange(options.dateRange);

    const fetchData = async () => {
        try {
            if (options.type === "ReservedByUser") {
                return await ActivitiesService.getActivityInstancesForMyself();
            } else {
                return await ActivitiesService.getActivityInstancesByDates(options.dateRange);
            }
        } catch (error) {
            toast.error(mapErrorToErrorMessage(error, errorsMap));
            throw error;
        }
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey,
        queryFn: fetchData,
        select: (data) =>
            data.map((item) => ({
                ...item,
                startTime: new Date(item.startTime),
            })),
    });

    return {
        activitiesInstances: data ?? null,
        isLoading,
        error: error ? error.message : null,
        refetch,
    };
};

const errorsMap: HttpErrorsMap = {
    defaultError: "Failed to load reservations",
    statusCodesMap: {
        400: "Please log in to view reservations",
        500: "Server error",
    },
};
