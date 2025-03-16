import React from "react";

import { StyledRequirements } from "@/components/Requirements/styled";

type RequirementsProps = {
    requirements: string[];
    error?: string;
};

export const Requirements = ({ requirements, error }: RequirementsProps) => {
    return (
        <StyledRequirements.Container>
            {requirements.map((requirement, index) => (
                <StyledRequirements.Item key={index}>
                    <StyledRequirements.Requirement withError={requirement === error}>
                        • {requirement}
                    </StyledRequirements.Requirement>
                </StyledRequirements.Item>
            ))}
        </StyledRequirements.Container>
    );
};
