import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
import { ReservationsService } from "@/features/reservations/api/reservationsService";
import { QueryKey } from "@/lib/apiClient";
import { Reservation } from "@/types";

type UseReservations = {
    reservations: Reservation[] | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<unknown>;
};

type UseReservationOptions =
    | {
          type: "ReservationsForActivity";
          activityId: number;
          startTime: Date;
      }
    | {
          type: "ReservationsForUser";
          userId: number;
      };

export const useReservations = (options: UseReservationOptions): UseReservations => {
    const { error, setAndTranslateError } = useRequestErrorHandler();
    const {
        data,
        error: queryError,
        refetch,
        isLoading,
    } = useQuery({
        queryFn: ReservationsService.getAllReservations,
        select: (data) => data.map((item) => ({ ...item, startTime: new Date(item.startTime) })),
        queryKey: [QueryKey.Reservations, options],
    });

    useEffect(() => {
        if (queryError) {
            setAndTranslateError(mapErrorToErrorTranslationKey(queryError, errorsMap));
        }
    }, [queryError, setAndTranslateError]);

    const filteredData = useMemo(
        () =>
            data?.filter((reservation) => {
                if (options.type === "ReservationsForUser") {
                    return reservation.userId === options.userId;
                } else {
                    // TODO: Temporary solution needed until backend guys solve their handling of dates
                    const adjustedReservationStartTime = dayjs(reservation.startTime)
                        .add(-1 * new Date().getTimezoneOffset(), "minutes")
                        .toDate();

                    return (
                        reservation.activityId === options.activityId &&
                        dayjs(adjustedReservationStartTime).isSame(options.startTime)
                    );
                }
            }),
        [data, options]
    );

    return { reservations: filteredData ?? null, error, isLoading, refetch };
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.reservations.getAll.default",
    statusCodesMap: {},
};
