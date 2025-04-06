import { styled, YStack } from "tamagui";

export const StyledAppOverlay = {
    Container: styled(YStack, {
        fullscreen: true,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    }),
};
