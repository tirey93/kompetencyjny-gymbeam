import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { QueryKey } from "../../apiClient";
import { request } from "../../request";
import { useRequestErrorHandler } from "../../request/hooks/useRequestErrorHandler";
import {
    HttpErrorsTranslationsMap,
    mapErrorToErrorTranslationKey,
} from "../../request/utils/mapErrorToErrorTranslationKey";
import { Activity, ActivityDTO, Day } from "../Activities";

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

const mapActivityDTOToActivity = (activityDto: ActivityDTO): Activity => {
    const startTime = new Date(activityDto.startTime);
    const endTime = new Date(activityDto.endTime);
    const days: Day[] = ["1", "3", "5"];
    const startHour = new Date(); // TODO: Hubert - replace mock values

    return { ...activityDto, startTime, endTime, days, startHour };
};
