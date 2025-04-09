import { Stack } from "expo-router";
import { toast } from "sonner-native";
import { styled, Text, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { Spinner } from "@/components/Spinner";
import { useRemoveReservation } from "@/features/reservations";
import { useActivitiesInstances } from "@/features/activities";
import { ReservationsContent } from "@/features/reservations";

export default function ReservationsPage() {
    const { activitiesInstances, isLoading, refetch } = useActivitiesInstances({
        type: "ReservedByUser",
    });

    const { removeReservation } = useRemoveReservation();

    const handleRemoveReservation = async (reservationId: number) => {
        try {
            await removeReservation(reservationId);
            await refetch();
            toast.success("Reservation removed successfully.");
        } catch (error) {
            const errorMessage = (error as { message?: string }).message;

            toast.error("Failed to remove reservation", {
                description: errorMessage,
            });
        }
    };

    return (
        <ScreenContainer>
            <Stack.Screen options={{ headerShown: false }} />
            <Styled.View>
                <Styled.Text>Your Reservations</Styled.Text>
                {isLoading ? (
                    <Spinner size="large" />
                ) : (
                    <ReservationsContent
                        activitiesInstances={activitiesInstances}
                        onRemoveReservation={handleRemoveReservation}
                    />
                )}
            </Styled.View>
        </ScreenContainer>
    );
}

const Styled = {
    View: styled(View, {
        backgroundColor: "$background",
        minHeight: "100%",
        flex: 1,
        padding: "$4",
        alignItems: "center",
    }),
    Text: styled(Text, {
        fontSize: "$8",
        marginBottom: "$4",
    }),
};
