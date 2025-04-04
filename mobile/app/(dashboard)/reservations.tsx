import { Stack } from "expo-router";
import { toast } from "sonner-native";
import { View, Spinner, Text, styled } from "tamagui";

import { useActivitiesInstances } from "@/features/activities";
import { ReservationsContent } from "@/features/reservations";
import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";

export default function ReservationsPage() {
    const { activitiesInstances, isLoading } = useActivitiesInstances({
        type: "ReservedByUser",
    });

    const handleRemoveReservation = async (reservationId: number) => {
        // Will be done when the reservation logic is complete
        toast.success("Reservation removed");
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
