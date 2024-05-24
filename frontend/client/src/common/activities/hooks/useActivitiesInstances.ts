import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

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
                ? getActivitiesInstancesByDateRangeRequest(options.dateRange)
                : getActivitiesInstancesReservedByUser(),
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

const getActivitiesInstancesByDateRangeRequest = ({ from, to }: { from: Date; to: Date }) => {
    const endOfLastDay = dayjs(to).endOf("day");

    return request("GetActivitiesInstancesByDates", {
        queryParams: { from: from.toISOString(), to: endOfLastDay.toISOString() },
    });
};

const getActivitiesInstancesReservedByUser = () => {
    return request("GetActivitiesInstancesReservedByUser");
};

const mapResponse = (data: ActivityInstance[]) =>
    data.map((item) => ({ ...item, startTime: new Date(item.startTime) }));

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.activitiesInstances.getAll.default",
    statusCodesMap: {},
};
