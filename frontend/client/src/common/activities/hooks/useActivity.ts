import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { QueryKey } from "../../apiClient";
import { request } from "../../request";
import { useRequestErrorHandler } from "../../request/hooks/useRequestErrorHandler";
import {
    HttpErrorsTranslationsMap,
    mapErrorToErrorTranslationKey,
} from "../../request/utils/mapErrorToErrorTranslationKey";
import { Activity } from "../Activities";
import { mapActivityDTOToActivity } from "../utils/activityMappers";

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
