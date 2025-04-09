import { useQuery } from "@tanstack/react-query";

import { HttpErrorsMap, mapErrorToErrorMessage } from "@/api";
import { ActivitiesService } from "@/features/activities";
import { ActivitiesQueryKeyFactory } from "@/features/activities/utils/acivitiesQueryKeyFactory";

export const useActivities = () => {
    const { error, ...result } = useQuery({
        queryFn: ActivitiesService.getAllActivities,
        queryKey: ActivitiesQueryKeyFactory.createForAll(),
    });

    return { ...result, error: error ? mapErrorToErrorMessage(error, errorsMap) : null };
};

const errorsMap: HttpErrorsMap = {
    defaultError: "Failed to find activities.",
    statusCodesMap: {},
};
