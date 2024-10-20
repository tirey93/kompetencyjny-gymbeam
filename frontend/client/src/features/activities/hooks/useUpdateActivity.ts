import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
import { ActivitiesService } from "@/features/activities/api/activitiesService";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";
import { ActivityDTO } from "@/types";

type UseUpdateActivity = {
    updateActivity: (activityDto: ActivityDTO) => Promise<void>;
    error: string | null;
    isLoading: boolean;
    reset: () => void;
};

export const useUpdateActivity = (): UseUpdateActivity => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: ActivitiesService.updateActivity,
        onSuccess: () => invalidate(QueryKey.Activities),
    });

    const updateActivity = useCallback(
        async (activityDto: ActivityDTO) => {
            try {
                await mutateAsync(activityDto);
            } catch (error) {
                const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
                throw new Error(setAndTranslateError(errorTranslation));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { updateActivity, error, reset, isLoading: isPending };
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.activities.update.default",
    statusCodesMap: {
        404: "apiErrors.activities.update.notFound",
    },
};
