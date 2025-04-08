import React from "react";
import { SizableText } from "tamagui";

import { StyledActivityDetails } from "./styled";

type ActivityDetailsProps = {
    name: string;
    description: string;
};

// TODO: Add more content
export const ActivityDetails = ({ name, description }: ActivityDetailsProps) => {
    return (
        <StyledActivityDetails.Container>
            <StyledActivityDetails.ActivityName>{name}</StyledActivityDetails.ActivityName>
            <SizableText>{description}</SizableText>
        </StyledActivityDetails.Container>
    );
};
