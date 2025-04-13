import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ReservationsService } from "../api/reservationsService";

import { HttpErrorsMap, mapErrorToErrorMessage } from "@/api";
import { ReservationsQueryKeyFactory } from "@/features/reservations/utils/reservationsQueryKeyFactory";

type UseRemoveReservation = {
    removeReservation: (reservationId: number) => Promise<void>;
};

export const useRemoveReservation = (): UseRemoveReservation => {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: ReservationsService.removeReservation,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ReservationsQueryKeyFactory.createForAll(),
            });
        },
    });

    const removeReservation = useCallback(
        async (reservationId: number) => {
            try {
                await mutateAsync(reservationId);
            } catch (error) {
                const errorMessage = mapErrorToErrorMessage(error, errorsMap);
                throw new Error(errorMessage);
            }
        },
        [mutateAsync]
    );

    return { removeReservation };
};

const errorsMap: HttpErrorsMap = {
    defaultError: "Unknown error.",
    statusCodesMap: {
        403: "Unauthorized action.",
        404: "Reservation not found.",
    },
};
