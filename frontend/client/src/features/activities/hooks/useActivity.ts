import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey, useRequestErrorHandler } from "@/api";
import { ActivitiesService, mapActivityDTOToActivity } from "@/features/activities";
import { QueryKey } from "@/lib/apiClient";
import { Activity } from "@/types";

type useActivity = {
    activity: Activity | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<unknown>;
};

export const useActivity = (activityId: number): useActivity => {
    const { error, setAndTranslateError } = useRequestErrorHandler();
    const {
        data,
        error: queryError,
        refetch,
        isLoading,
    } = useQuery({
        queryFn: () => ActivitiesService.getActivity(activityId),
        queryKey: [QueryKey.Activities, activityId],
    });

    useEffect(() => {
        if (queryError) {
            setAndTranslateError(mapErrorToErrorTranslationKey(queryError, errorsMap));
        }
    }, [queryError, setAndTranslateError]);

    return { activity: data ? mapActivityDTOToActivity(data) : null, error, isLoading, refetch };
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.activities.getOne.default",
    statusCodesMap: {},
};
