import { SizableText, styled, XStack } from "tamagui";

export const StyledTimestamp = {
    Container: styled(XStack, {
        alignItems: "center",
        justifyContent: "center",
        gap: "$2",
        width: "100%",
    }),
    TimeText: styled(SizableText, {
        fontSize: "$8",
        fontWeight: "700",
    }),
    DateText: styled(SizableText, {
        fontSize: "$8",
        fontWeight: "700",
        color: "$color08",
    }),
};
