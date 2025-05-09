import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ReservationsService } from "../api/reservationsService";
import { mapErrorToErrorMessage, HttpErrorsMap } from "@/api";
import { ActivitiesQueryKeyFactory } from "@/features/activities/utils/acivitiesQueryKeyFactory";
import { ReservationsQueryKeyFactory } from "@/features/reservations/utils/reservationsQueryKeyFactory";

type UseRemoveReservation = {
    removeReservation: (reservationId: number) => Promise<void>;
};

export const useRemoveReservation = (): UseRemoveReservation => {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: ReservationsService.removeReservation,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ReservationsQueryKeyFactory.createForAll(),
            });

            queryClient.invalidateQueries({
                queryKey: ActivitiesQueryKeyFactory.createForAll()
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
