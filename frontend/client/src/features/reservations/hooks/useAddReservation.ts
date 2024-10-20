import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey, useRequestErrorHandler } from "@/api";
import { ReservationsService } from "@/features/reservations";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";
import { AddReservationDTO } from "@/types";

type UseAddReservation = {
    addReservation: (body: AddReservationDTO) => Promise<void>;
    isLoading: boolean;
    error: string | null;
    reset: () => void;
};

export const useAddReservation = (): UseAddReservation => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync, isPending: isLoading } = useMutation({
        mutationFn: ReservationsService.addReservation,
        onSuccess: () => invalidate(QueryKey.Enrollments, QueryKey.Reservations),
    });

    const addReservation = useCallback(
        async (dto: AddReservationDTO) => {
            try {
                await mutateAsync(dto);
            } catch (error) {
                const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
                throw new Error(setAndTranslateError(errorTranslation));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { addReservation, error, reset, isLoading };
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.reservations.add.default",
    statusCodesMap: {
        403: "apiErrors.reservations.add.forbidden",
        404: "apiErrors.reservations.add.notFound",
    },
};
