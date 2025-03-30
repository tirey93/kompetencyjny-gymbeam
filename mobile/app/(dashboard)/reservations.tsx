import React from "react";
import { Link, router, Stack } from "expo-router";
import { toast } from "sonner-native";
import { View, Spinner, Text, styled } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { useActivitiesInstances } from "@/features/activities";
import { ReservationsList } from "@/features/reservations";
import { TouchableOpacity } from "react-native";
import { Screens } from "@/constants/Screens";

export default function ReservationsPage() {
    const { activitiesInstances, isLoading, error } = useActivitiesInstances({
        type: "ReservedByUser"
    });

    const handleRemoveReservation = async (reservationId: number) => {
        // Will be done when the reservation logic is complete
        toast.success("Reservation removed");
    };

    React.useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <ScreenContainer>
            <Stack.Screen options={{ headerShown: false }} />
            <Styled.View>
                <Styled.Text>
                    Your Reservations
                </Styled.Text>

                {isLoading ? (
                    <Spinner size="large" />
                ) : activitiesInstances?.length ? (
                    <ReservationsList
                        reservations={activitiesInstances}
                        onRemoveReservation={handleRemoveReservation}
                    />
                ) : (
                    <ScreenContainer>
                        <Styled.View>
                            <Styled.HeaderText>Nothing to display.</Styled.HeaderText>
                            <Styled.SubText>You don't have any pending reservations right now.</Styled.SubText>
                            <Link href={Screens.Activities} asChild>
                                <Styled.Button>
                                    <Styled.ButtonText>See available activities +</Styled.ButtonText>
                                </Styled.Button>
                            </Link>
                        </Styled.View>
                    </ScreenContainer>
                )}
            </Styled.View>
        </ScreenContainer>
    );
}

const Styled = {
    View: styled(View, {
        backgroundColor: "$background",
        minHeight: "100%",
        flex:1,
        padding: "$4",
        alignItems: "center",
        justifyContent: "center",
    }),
    Text: styled(Text, {
        fontSize: "$8",
        fontWeight: "700",
        marginBottom: "$4"
    }),
    HeaderText: styled(Text, {
        fontSize: "$6",
        fontWeight: "700",
        marginBottom: "$2",
        color: "#FFFFFF"
    }),
    SubText: styled(Text, {
        fontSize: "$3",
        color: "#A0A0A0",
        marginBottom: "$4"
    }),
    Button: styled(TouchableOpacity, {
        backgroundColor: "#1D9942",
        paddingVertical: "$3",
        paddingHorizontal: "$5",
        borderRadius: "$12"
    }),
    ButtonText: styled(Text, {
        color: "#FFFFFF",
        fontSize: "$5",
        fontWeight: "600"
    })
};

