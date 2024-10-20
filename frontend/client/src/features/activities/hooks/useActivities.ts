import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { request } from "@/api";
import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
import { mapActivityDTOToActivity } from "@/features/activities";
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
        queryFn: getAllActivitiesRequest,
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

const getAllActivitiesRequest = () => {
    return request("GetAllActivities");
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.activities.getAll.default",
    statusCodesMap: {},
};