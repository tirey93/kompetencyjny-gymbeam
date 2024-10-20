import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey, useRequestErrorHandler } from "@/api";
import { ActivitiesService } from "@/features/activities";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

type UseDeleteActivity = {
    deleteActivity: (activityId: number) => Promise<void>;
    error: string | null;
    isLoading: boolean;
    reset: () => void;
};

export const useDeleteActivity = (): UseDeleteActivity => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: ActivitiesService.deleteActivity,
        onSuccess: () => invalidate(QueryKey.Activities),
    });

    const deleteActivity = useCallback(
        async (activityId: number) => {
            try {
                await mutateAsync(activityId);
            } catch (error) {
                const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
                throw new Error(setAndTranslateError(errorTranslation));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { deleteActivity, error, reset, isLoading: isPending };
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.activities.delete.default",
    statusCodesMap: {
        404: "apiErrors.activities.delete.notFound",
    },
};
