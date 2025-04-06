import { styled, Text, View, XStack, YStack } from "tamagui";

export const StyledActivityInstanceItem = {
    Card: styled(View, {
        backgroundColor: "$color2",
        borderColor: "$color3",
        borderWidth: 1,
        padding: "$3",
        borderRadius: "$2",
        animation: "bouncy",
        hoverStyle: { scale: 1.05 },
        pressStyle: { scale: 0.9 },
        variants: {
            isExpired: {
                true: {
                    opacity: 0.66,
                },
            },
        } as const,
    }),
    Text: styled(Text, {
        fontSize: "$4",
    }),
    Row: styled(XStack, {
        alignItems: "center",
        gap: "$2",
    }),
    Column: styled(YStack, {
        gap: "$2",
    }),
};
