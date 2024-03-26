import { Center, Loader, Overlay } from "@mantine/core";

import { useAppOverlayStore } from "./hooks/useAppOverlayStore";

export const AppOverlay = () => {
    const isLoading = useAppOverlayStore((state) => state.isLoading);

    return isLoading ? (
        <Overlay fixed blur={2} backgroundOpacity={0.5}>
            <Center h="90%">
                <Loader color="info" size="xl" type="dots" />
            </Center>
        </Overlay>
    ) : null;
};
