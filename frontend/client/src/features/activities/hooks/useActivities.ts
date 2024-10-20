import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey, useRequestErrorHandler } from "@/api";
import { ActivitiesService, mapActivityDTOToActivity } from "@/features/activities";
import { QueryKey } from "@/lib/apiClient";
import { Activity } from "@/types";

type UseActivities = {
    activities: Activity[] | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<unknown>;
};

export const useActivities = (): UseActivities => {
    const { error, setAndTranslateError } = useRequestErrorHandler();
    const {
        data,
        error: queryError,
        refetch,
        isLoading,
    } = useQuery({
        queryFn: ActivitiesService.getAllActivities,
        select: (items) => items.map(mapActivityDTOToActivity),
        queryKey: [QueryKey.Activities],
    });

    useEffect(() => {
        if (queryError) {
            setAndTranslateError(mapErrorToErrorTranslationKey(queryError, errorsMap));
        }
    }, [queryError, setAndTranslateError]);

    return { activities: data ?? null, error, isLoading, refetch };
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.activities.getAll.default",
    statusCodesMap: {},
};
