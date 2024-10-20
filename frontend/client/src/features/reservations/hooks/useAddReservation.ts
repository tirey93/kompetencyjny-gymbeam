import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { request } from "@/api";
import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
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
        mutationFn: addReservationRequest,
        onSuccess: () => invalidate(QueryKey.Enrollments, QueryKey.Reservations),
    });

    const addReservation = useCallback(
        async (body: AddReservationDTO) => {
            try {
                await mutateAsync(body);
            } catch (error) {
                const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
                throw new Error(setAndTranslateError(errorTranslation));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { addReservation, error, reset, isLoading };
};

const addReservationRequest = (body: AddReservationDTO) => {
    return request("AddReservation", { body });
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.reservations.add.default",
    statusCodesMap: {
        403: "apiErrors.reservations.add.forbidden",
        404: "apiErrors.reservations.add.notFound",
    },
};
