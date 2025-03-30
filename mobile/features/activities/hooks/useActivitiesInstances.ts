import { useCallback, useState, useEffect } from "react";
import { ActivitiesService } from "@/features/activities";
import { ActivityInstance } from "@/types";
import { mapErrorToErrorMessage } from "@/api";
import { toast } from "sonner-native";

type UseActivitiesInstancesResult = {
    activitiesInstances: ActivityInstance[] | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
};

type UseActivitiesInstancesOptions = {
    type: "ReservedByUser";
} | {
    type: "ByDateRange";
    dateRange: { from: Date; to: Date };
};

export const useActivitiesInstances = (options: UseActivitiesInstancesOptions): UseActivitiesInstancesResult => {
    const [activitiesInstances, setActivitiesInstances] = useState<ActivityInstance[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await ActivitiesService.getActivityInstancesForMyself();
            setActivitiesInstances(data.map(item => ({
                ...item,
                startTime: new Date(item.startTime)
            })));
        } catch (err) {
            toast.error(mapErrorToErrorMessage(err, errorsMap));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        activitiesInstances,
        isLoading,
        error,
        refetch: fetchData
    };
};

const errorsMap = {
    defaultError: "Failed to load reservations",
    statusCodesMap: {
        400: "Please log in to view reservations",
        500: "Server error"
    }
};
