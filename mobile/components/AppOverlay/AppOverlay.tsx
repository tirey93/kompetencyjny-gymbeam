import React from "react";

import { StyledAppOverlay } from "@/components/AppOverlay/styled";
import { Spinner } from "@/components/Spinner";
import { useAppOverlay } from "@/hooks/useAppOverlay";

export const AppOverlay = () => {
    const isLoading = useAppOverlay((state) => state.isLoading);

    if (!isLoading) {
        return null;
    }

    return (
        <StyledAppOverlay.Container>
            <Spinner size="large" />
        </StyledAppOverlay.Container>
    );
};
