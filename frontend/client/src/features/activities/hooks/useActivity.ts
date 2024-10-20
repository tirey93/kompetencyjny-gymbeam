import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { request } from "@/api";
import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
import { mapActivityDTOToActivity } from "@/features/activities";
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
        queryFn: () => getActivityRequest(activityId),
        queryKey: [QueryKey.Activities, activityId],
    });

    useEffect(() => {
        if (queryError) {
            setAndTranslateError(mapErrorToErrorTranslationKey(queryError, errorsMap));
        }
    }, [queryError, setAndTranslateError]);

    return { activity: data ? mapActivityDTOToActivity(data) : null, error, isLoading, refetch };
};

const getActivityRequest = (activityId: number) => {
    return request("GetActivity", { urlParams: { activityId: activityId.toString() } });
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.activities.getOne.default",
    statusCodesMap: {},
};
