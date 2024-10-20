import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { request } from "@/api";
import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

type UseDeleteActivity = {
    deleteActivity: (activityId: number) => Promise<void>;
    error: string | null;
    isLoading: boolean;
    reset: () => void;
};

type DeleteActivityRequestOptions = {
    urlParams: { activityId: string };
};

const deleteActivityRequest = (options: DeleteActivityRequestOptions) => {
    return request("DeleteActivity", {
        ...options,
    });
};

export const useDeleteActivity = (): UseDeleteActivity => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: deleteActivityRequest,
        onSuccess: () => invalidate(QueryKey.Activities),
    });

    const deleteActivity = useCallback(
        async (activityId: number) => {
            try {
                await mutateAsync({
                    urlParams: { activityId: activityId.toString() },
                });
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
