import React from "react";
import { YStack } from "tamagui";

import { StyledGymPassInfo } from "@/features/gym-pass/components/GymPassInfo/styled";
import { User } from "@/types";

type GymPassInfoProps = {
    owner: User;
};

export const GymPassInfo = ({ owner }: GymPassInfoProps) => {
    return (
        <StyledGymPassInfo.Container>
            <YStack>
                <StyledGymPassInfo.Label>Owner</StyledGymPassInfo.Label>
                <StyledGymPassInfo.Value>
                    {owner.name} ({owner.login})
                </StyledGymPassInfo.Value>
            </YStack>

            <YStack>
                <StyledGymPassInfo.Label>Expires at</StyledGymPassInfo.Label>
                <StyledGymPassInfo.Value>
                    {owner.gymPassExpirationTime ? owner.gymPassExpirationTime.toLocaleString() : "Already expired"}
                </StyledGymPassInfo.Value>
            </YStack>

            <YStack>
                <StyledGymPassInfo.Label>Reservations</StyledGymPassInfo.Label>
                <StyledGymPassInfo.Value>
                    {owner.areReservationsForbidden ? "Forbidden" : "Allowed"}
                </StyledGymPassInfo.Value>
            </YStack>
        </StyledGymPassInfo.Container>
    );
};
