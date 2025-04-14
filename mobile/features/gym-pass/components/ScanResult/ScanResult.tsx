import React from "react";
import { ScrollView, SizableText, View } from "tamagui";

import { StyledScanResult } from "./styled";

import { Spinner } from "@/components/Spinner";
import { GymPassValidator } from "@/features/gym-pass/services/GymPassValidator";
import { SimpleReservationItemCard } from "@/features/reservations/components/ReservationItemCard/SimpleReservationItemCard";
import { useReservations } from "@/features/reservations/hooks/useReservations";
import { User } from "@/types";

type ScanResultProps = {
    userData: User;
};

export const ScanResult = ({ userData }: ScanResultProps) => {
    const isValid = GymPassValidator.validate(userData);
    const { reservations, isLoading } = useReservations({
        userId: userData?.id,
        enabled: isValid,
    });

    return (
        <StyledScanResult.Container>
            <StyledScanResult.ContentStack>
                <View>
                    <StyledScanResult.UserName>{userData.name}</StyledScanResult.UserName>
                    <StyledScanResult.UserLogin>Login: {userData.login}</StyledScanResult.UserLogin>
                </View>

                <StyledScanResult.Status valid={isValid}>
                    {isValid ? "GymPass is valid." : "GymPass is invalid!"}
                </StyledScanResult.Status>

                {isValid && isLoading && <Spinner size="large" />}

                {isValid && !isLoading && (
                    <ScrollView>
                        {reservations?.map((reservation) => (
                            <SimpleReservationItemCard key={reservation.id} reservation={reservation} />
                        ))}

                        {!reservations?.length && <SizableText>This user does not have any reservations.</SizableText>}
                    </ScrollView>
                )}
            </StyledScanResult.ContentStack>
        </StyledScanResult.Container>
    );
};
