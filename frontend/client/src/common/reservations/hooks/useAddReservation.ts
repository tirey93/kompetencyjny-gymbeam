import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { QueryKey, useInvalidateQuery } from "../../apiClient";
import { request } from "../../request";
import { useRequestErrorHandler } from "../../request/hooks/useRequestErrorHandler";
import {
    HttpErrorsTranslationsMap,
    mapErrorToErrorTranslationKey,
} from "../../request/utils/mapErrorToErrorTranslationKey";

type UseAddReservation = {
    addReservation: (activityInstanceId: number) => Promise<void>;
    isLoading: boolean;
    error: string | null;
    reset: () => void;
};

export const useAddReservation = (): UseAddReservation => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync, isPending: isLoading } = useMutation({
        mutationFn: addReservationRequest,
        onSuccess: () => invalidate(QueryKey.Enrollments),
    });

    const addReservation = useCallback(
        async (activityInstanceId: number) => {
            try {
                await mutateAsync(activityInstanceId);
            } catch (error) {
                const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
                throw new Error(setAndTranslateError(errorTranslation));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { addReservation, error, reset, isLoading };
};

const addReservationRequest = (_activityInstanceId: number) => {
    return request("AddReservation");
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.reservations.add.default",
    statusCodesMap: {},
};
