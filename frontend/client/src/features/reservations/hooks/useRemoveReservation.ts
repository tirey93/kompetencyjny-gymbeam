import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
import { ReservationsService } from "@/features/reservations/api/reservationsService";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

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
        mutationFn: ReservationsService.removeReservation,
        onSuccess: () => invalidate(QueryKey.Enrollments, QueryKey.Reservations),
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

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.reservations.remove.default",
    statusCodesMap: {
        403: "apiErrors.reservations.remove.forbidden",
        404: "apiErrors.reservations.remove.notFound",
    },
};
