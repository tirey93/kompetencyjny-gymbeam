import { useEffect, useState } from "react";

import { StyledTimestamp } from "@/features/gym-pass/components/Timestamp/styled";

export const Timestamp = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <StyledTimestamp.Container>
            <StyledTimestamp.TimeText>{currentDateTime.toLocaleTimeString()}</StyledTimestamp.TimeText>
            <StyledTimestamp.DateText>{currentDateTime.toLocaleDateString()}</StyledTimestamp.DateText>
        </StyledTimestamp.Container>
    );
};
