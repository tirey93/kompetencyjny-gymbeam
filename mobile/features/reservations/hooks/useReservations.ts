import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { ReservationsService } from "@/features/reservations/api/reservationsService";
import { ReservationsQueryKeyFactory } from "@/features/reservations/utils/reservationsQueryKeyFactory";

type UseReservationOptions = {
    userId: number;
    enabled?: boolean;
};

export const useReservations = (options: UseReservationOptions) => {
    const { data, ...rest } = useQuery({
        queryFn: ReservationsService.getAllReservations,
        enabled: options.enabled,
        select: (data) => data.map((item) => ({ ...item, startTime: new Date(item.startTime) })),
        queryKey: ReservationsQueryKeyFactory.createForUser(options.userId),
    });

    const filteredData = useMemo(
        () => data?.filter((reservation) => reservation.userId === options.userId),
        [data, options]
    );

    return { reservations: filteredData ?? null, ...rest };
};
