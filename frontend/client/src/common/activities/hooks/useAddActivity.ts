import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { QueryKey, useInvalidateQuery } from "../../apiClient";
import { request } from "../../request";
import { useRequestErrorHandler } from "../../request/hooks/useRequestErrorHandler";
import {
    HttpErrorsTranslationsMap,
    mapErrorToErrorTranslationKey,
} from "../../request/utils/mapErrorToErrorTranslationKey";
import { AddActivityDTO } from "../Activities";

type UseAddActivity = {
    addActivity: (addActivityDto: AddActivityDTO) => Promise<void>;
    error: string | null;
    isLoading: boolean;
    reset: () => void;
};

const addActivityRequest = (addActivityDto: AddActivityDTO) => {
    return request("AddActivity", { body: addActivityDto });
};

export const useAddActivity = (): UseAddActivity => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: addActivityRequest,
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
