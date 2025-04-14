import { useCallback } from "react";
import { Clock, User, Users } from "@tamagui/lucide-icons";
import dayjs from "dayjs";
import { toast } from "sonner-native";

import { StyledActivityInstanceItem } from "@/features/activities/components/ActivityInstanceItem/styled";
import { ActivityInstance } from "@/types";
import { ReservationButton } from "./components/ReservationButton";
import { useAuthState } from "@/features/auth";
import { useAddReservation, useRemoveReservation } from "@/features/reservations";
import { withConfirmation } from "@/features/reservations/utils/withConfirmation";

const ICON_SIZE = 16;

type ActivityInstanceItemProps = {
    activity: ActivityInstance;
};

export const ActivityInstanceItem = ({ activity }: ActivityInstanceItemProps) => {
    const user = useAuthState().user;
    const startTime = new Date(activity.startTime);
    const endTime = new Date(startTime.getTime() + activity.duration * 60000);

    const { addReservation } = useAddReservation();
    const { removeReservation } = useRemoveReservation();

    const isExpired = dayjs(activity.startTime).isBefore(dayjs());
    const hasReachedCapacity = activity.totalCapacity === activity.slotsTaken;
    const isAlreadyReserved = !!activity.reservationId;

    const startTimeString = startTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const endTimeString = endTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const handleAddReservation = useCallback(async () => {
        try {
            if (!user) throw new Error();

            await addReservation({
                activityId: activity.activityId,
                userId: user.id,
                startTime: activity.startTime.toISOString(),
            });

            toast.success(`You've successfully reserved a spot for ${activity.name}`);
        } catch (error) {
            toast.error((error as Error).message ?? "Unknown error occurred during reservation.");
        }
    }, [addReservation, activity, user]);

    const handleRemoveReservation = useCallback(() => {
        withConfirmation(
            `Are you sure you want to cancel the reservation for ${activity.name}?`,
            async () => {
                if (activity.reservationId == null) {
                    toast.error("Missing reservation ID.");
                    return;
                }
                try {
                    await removeReservation(activity.reservationId);
                    toast.success(`Reservation for ${activity.name} has been cancelled.`);
                } catch (error) {
                    toast.error((error as Error).message ?? "Failed to cancel reservation.");
                }
            }
        );
    }, [removeReservation, activity]);

    return (
        <StyledActivityInstanceItem.Card isExpired={isExpired}>
            <StyledActivityInstanceItem.ContentRow>
                <StyledActivityInstanceItem.Column>
                    <StyledActivityInstanceItem.Row>
                        <Clock size={ICON_SIZE} color="$accent8" />
                        <StyledActivityInstanceItem.Text>
                            {startTimeString} - {endTimeString}
                        </StyledActivityInstanceItem.Text>
                    </StyledActivityInstanceItem.Row>

                    <StyledActivityInstanceItem.Row>
                        <Users size={ICON_SIZE} color="$accent8" />
                        <StyledActivityInstanceItem.Text>
                            {activity.slotsTaken}/{activity.totalCapacity} slots
                        </StyledActivityInstanceItem.Text>
                    </StyledActivityInstanceItem.Row>

                    <StyledActivityInstanceItem.Row>
                        <User size={ICON_SIZE} color="$accent8" />
                        <StyledActivityInstanceItem.Text>{activity.leaderName}</StyledActivityInstanceItem.Text>
                    </StyledActivityInstanceItem.Row>
                </StyledActivityInstanceItem.Column>

                <ReservationButton
                    isExpired={isExpired}
                    hasReachedCapacity={hasReachedCapacity}
                    user={user}
                    activityDate={activity.startTime}
                    onReservation={handleAddReservation}
                    onCancellation={handleRemoveReservation}
                    isAlreadyReserved={isAlreadyReserved}
                />
            </StyledActivityInstanceItem.ContentRow>
        </StyledActivityInstanceItem.Card>
    );
};
