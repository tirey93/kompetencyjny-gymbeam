import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { QueryKey, useInvalidateQuery } from "../../apiClient";
import { request } from "../../request";
import { useRequestErrorHandler } from "../../request/hooks/useRequestErrorHandler";
import {
    HttpErrorsTranslationsMap,
    mapErrorToErrorTranslationKey,
} from "../../request/utils/mapErrorToErrorTranslationKey";

type UseRemoveReservation = {
    removeReservation: (reservationId: number) => Promise<void>;
    error: string | null;
    isLoading: boolean;
    reset: () => void;
};

export const useRemoveReservation = (): UseRemoveReservation => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync, isPending: isLoading } = useMutation({
        mutationFn: removeReservationRequest,
        onSuccess: () => invalidate(QueryKey.Enrollments),
    });

    const removeReservation = useCallback(
        async (reservationId: number) => {
            try {
                await mutateAsync(reservationId);
            } catch (error) {
                const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
                throw new Error(setAndTranslateError(errorTranslation));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { removeReservation, error, reset, isLoading };
};

const removeReservationRequest = (reservationId: number) => {
    return request("RemoveReservation", { urlParams: { id: reservationId.toString() } });
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.reservations.remove.default",
    statusCodesMap: {
        403: "apiErrors.reservations.remove.forbidden",
        404: "apiErrors.reservations.remove.notFound",
    },
};
