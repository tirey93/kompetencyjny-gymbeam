import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { QueryKey, useInvalidateQuery } from "../../apiClient";
import { request } from "../../request";
import { useRequestErrorHandler } from "../../request/hooks/useRequestErrorHandler";
import {
    HttpErrorsTranslationsMap,
    mapErrorToErrorTranslationKey,
} from "../../request/utils/mapErrorToErrorTranslationKey";
import { ActivityDTO } from "../Activities";

type UseUpdateActivity = {
    updateActivity: (activityDto: ActivityDTO) => Promise<void>;
    error: string | null;
    isLoading: boolean;
    reset: () => void;
};

const updateActivityRequest = (activityDto: ActivityDTO) => {
    return request("UpdateActivity", { body: activityDto, urlParams: { activityId: activityDto.id.toString() } });
};

export const useUpdateActivity = (): UseUpdateActivity => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: updateActivityRequest,
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
    statusCodesMap: {},
};
