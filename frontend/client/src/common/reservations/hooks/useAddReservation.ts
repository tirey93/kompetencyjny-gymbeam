import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { QueryKey, useInvalidateQuery } from "../../apiClient";
import { request } from "../../request";
import { useRequestErrorHandler } from "../../request/hooks/useRequestErrorHandler";
import {
    HttpErrorsTranslationsMap,
    mapErrorToErrorTranslationKey,
} from "../../request/utils/mapErrorToErrorTranslationKey";
import { AddReservationDTO } from "../Reservations";

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
        onSuccess: () => invalidate(QueryKey.Enrollments),
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
    statusCodesMap: {},
};
