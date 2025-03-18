import { SizableText, styled, YStack } from "tamagui";

export const StyledGymPassInfo = {
    Container: styled(YStack, {
        width: "100%",
        gap: "$2",
        padding: "$2",
        alignItems: "center",
    }),

    Label: styled(SizableText, {
        fontSize: "$2",
        textAlign: "center",
        fontWeight: "700",
    }),

    Value: styled(SizableText, {
        fontSize: "$4",
        textAlign: "center",
    }),
};
