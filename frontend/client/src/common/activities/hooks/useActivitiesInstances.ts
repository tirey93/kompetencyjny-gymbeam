import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { QueryKey } from "../../apiClient";
import { request } from "../../request";
import { useRequestErrorHandler } from "../../request/hooks/useRequestErrorHandler";
import {
    HttpErrorsTranslationsMap,
    mapErrorToErrorTranslationKey,
} from "../../request/utils/mapErrorToErrorTranslationKey";
import { ActivityInstance } from "../Activities";

type UseActivitiesInstances = {
    activitiesInstances: ActivityInstance[] | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<unknown>;
};

type UseActivitiesInstancesOptions = {
    dateRange: {
        from: Date;
        to: Date;
    };
};

export const useActivitiesInstances = ({ dateRange }: UseActivitiesInstancesOptions): UseActivitiesInstances => {
    const { error, setAndTranslateError } = useRequestErrorHandler();
    const {
        data,
        error: queryError,
        refetch,
        isLoading,
    } = useQuery({
        queryFn: () => getActivitiesInstancesRequests(dateRange),
        select: mapResponse,
        queryKey: [QueryKey.Enrollments, dateRange],
    });

    useEffect(() => {
        if (queryError) {
            setAndTranslateError(mapErrorToErrorTranslationKey(queryError, errorsMap));
        }
    }, [queryError, setAndTranslateError]);

    return { activitiesInstances: data ?? null, error, isLoading, refetch };
};

const getActivitiesInstancesRequests = ({ from, to }: { from: Date; to: Date }) => {
    return request("GetActivitiesInstancesByDates", {
        queryParams: { from: from.toISOString(), to: to.toISOString() },
    });
};

const mapResponse = (data: ActivityInstance[]) =>
    data.map((item) => ({ ...item, startTime: new Date(item.startTime) }));

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.activitiesInstances.getAll.default",
    statusCodesMap: {},
};
