import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
import { ActivitiesService } from "@/features/activities/api/activitiesService";
import { QueryKey } from "@/lib/apiClient";
import { ActivityInstance } from "@/types";

type UseActivitiesInstances = {
    activitiesInstances: ActivityInstance[] | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<unknown>;
};

type UseActivitiesInstancesOptions = UseActivitiesInstancesByDateRange | UseActivitiesInstancesReservedByUser;

type UseActivitiesInstancesByDateRange = {
    type: "ByDateRange";
    dateRange: {
        from: Date;
        to: Date;
    };
};

type UseActivitiesInstancesReservedByUser = {
    type: "ReservedByUser";
};

export const useActivitiesInstances = (options: UseActivitiesInstancesOptions): UseActivitiesInstances => {
    const { error, setAndTranslateError } = useRequestErrorHandler();
    const {
        data,
        error: queryError,
        refetch,
        isLoading,
    } = useQuery({
        queryFn: () =>
            options.type === "ByDateRange"
                ? ActivitiesService.getActivityInstancesByDates(options.dateRange)
                : ActivitiesService.getActivityInstancesForMyself(),
        select: mapResponse,
        queryKey: [QueryKey.Enrollments, options],
    });

    useEffect(() => {
        if (queryError) {
            setAndTranslateError(mapErrorToErrorTranslationKey(queryError, errorsMap));
        }
    }, [queryError, setAndTranslateError]);

    return { activitiesInstances: data ?? null, error, isLoading, refetch };
};

const mapResponse = (data: ActivityInstance[]) =>
    data.map((item) => ({ ...item, startTime: new Date(item.startTime) }));

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.activitiesInstances.getAll.default",
    statusCodesMap: {},
};
