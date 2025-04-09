import React, { useMemo } from "react";
import { YStack } from "tamagui";
import dayjs from "dayjs";
import { ActivityInstance } from "@/types";
import { ReservationSection } from "@/features/reservations";

type ReservationListProps = {
    reservations: ActivityInstance[];
    onRemoveReservation?: (reservationId: number) => void;
    onShowDetails?: (activityId: number) => void;
};

export const ReservationsList = ({
    reservations,
    onRemoveReservation,
    onShowDetails
}: ReservationListProps) => {
    const groupedReservations = useMemo(() => {
        const groups = {
            today: [] as ActivityInstance[],
            upcoming: [] as ActivityInstance[],
            future: [] as ActivityInstance[]
        };

        const now = dayjs();
        const endOfToday = now.endOf('day');
        const endOfNextWeek = now.add(7, 'day').endOf('day');

        reservations.forEach((reservation) => {
            const startTime = dayjs(reservation.startTime);

            if (startTime.isBefore(endOfToday)) {
                groups.today.push(reservation);
            } else if (startTime.isBefore(endOfNextWeek)) {
                groups.upcoming.push(reservation);
            } else {
                groups.future.push(reservation);
            }
        });

        return groups;
    }, [reservations]);

    return (
        <YStack gap="$2">
            {groupedReservations.today.length > 0 && (
                <ReservationSection
                    label="Today"
                    items={groupedReservations.today}
                    onRemoveReservation={onRemoveReservation}
                    onShowDetails={onShowDetails}
                />
            )}

            {groupedReservations.upcoming.length > 0 && (
                <ReservationSection
                    label="Upcoming"
                    items={groupedReservations.upcoming}
                    onRemoveReservation={onRemoveReservation}
                    onShowDetails={onShowDetails}
                />
            )}

            {groupedReservations.future.length > 0 && (
                <ReservationSection
                    label="Later"
                    items={groupedReservations.future}
                    onRemoveReservation={onRemoveReservation}
                    onShowDetails={onShowDetails}
                />
            )}
        </YStack>
    );
};
