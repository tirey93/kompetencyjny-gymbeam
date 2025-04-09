import React from "react";

import { StyledScanResult } from "./styled";

import { GymPassValidator } from "@/features/gym-pass/services/GymPassValidator";
import { User } from "@/types";

type ScanResultProps = {
    userData: User;
};

// TODO: For additional safety fetch user data (and reservations?)
export const ScanResult = ({ userData }: ScanResultProps) => {
    const isValid = GymPassValidator.validate(userData);

    return (
        <StyledScanResult.Container>
            <StyledScanResult.ContentStack>
                <StyledScanResult.UserName>{userData.name}</StyledScanResult.UserName>
                <StyledScanResult.UserLogin>Login: {userData.login}</StyledScanResult.UserLogin>

                <StyledScanResult.Status valid={isValid}>
                    {isValid ? "GymPass is valid." : "GymPass is invalid!"}
                </StyledScanResult.Status>
            </StyledScanResult.ContentStack>
        </StyledScanResult.Container>
    );
};
