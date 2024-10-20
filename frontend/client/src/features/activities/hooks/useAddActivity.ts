import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey, useRequestErrorHandler } from "@/api";
import { ActivitiesService } from "@/features/activities";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";
import { AddActivityDTO } from "@/types";

type UseAddActivity = {
    addActivity: (addActivityDto: AddActivityDTO) => Promise<void>;
    error: string | null;
    isLoading: boolean;
    reset: () => void;
};

export const useAddActivity = (): UseAddActivity => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: ActivitiesService.addActivity,
        onSuccess: () => invalidate(QueryKey.Activities),
    });

    const addActivity = useCallback(
        async (addActivityDto: AddActivityDTO) => {
            try {
                await mutateAsync(addActivityDto);
            } catch (error) {
                const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
                throw new Error(setAndTranslateError(errorTranslation));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { addActivity, error, reset, isLoading: isPending };
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.activities.add.default",
    statusCodesMap: {},
};
