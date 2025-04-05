import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { ReservationsService } from "../api/reservationsService";
import { mapErrorToErrorMessage, HttpErrorsMap } from "@/api";

type UseRemoveReservation = {
    removeReservation: (reservationId: number) => Promise<void>;
};

export const useRemoveReservation = (): UseRemoveReservation => {
    const { mutateAsync } = useMutation({
        mutationFn: ReservationsService.removeReservation,
    });

    const removeReservation = useCallback(
        async (reservationId: number) => {
            console.log(`Try to remove reservation with ID: ${reservationId}.`);
            try {
                await mutateAsync(reservationId);
                console.log(`Reservation ${reservationId} removed.`);
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
