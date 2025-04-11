import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ReservationsService } from "@/features/reservations/api/reservationsService";
import { mapErrorToErrorMessage, HttpErrorsMap } from "@/api";
import { AddReservationDTO } from "@/types";
import { ActivitiesQueryKeyFactory } from "@/features/activities/utils/acivitiesQueryKeyFactory";

type UseAddReservation = {
    addReservation: (dto: AddReservationDTO) => Promise<void>;
};

export const useAddReservation = (): UseAddReservation => {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: ReservationsService.addReservation,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ActivitiesQueryKeyFactory.createForAll()
            })
        },
    });

    const addReservation = useCallback(
        async (dto: AddReservationDTO) => {
            try {
                await mutateAsync(dto);
            } catch (error) {
                const errorMessage = mapErrorToErrorMessage(error, errorsMap);
                throw new Error(errorMessage);
            }
        },
        [mutateAsync]
    );

    return { addReservation };
};

const errorsMap: HttpErrorsMap = {
    defaultError: "Unknown error occurred while adding reservation.",
    statusCodesMap: {
        400: "Please log in to place reservations.",
        403: "You are not allowed to perform this action.",
        404: "Reservation resource not found."
    },
};
