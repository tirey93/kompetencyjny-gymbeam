import { styled, View, Text, XStack, YStack } from "tamagui";

export const ReservationSectionStyled = {
    Container: styled(View, {
    }),

    Header: styled(XStack, {
        alignItems: "center",
        gap: "$2",
        marginVertical: "$2"
    }),

    Divider: styled(View, {
        flex: 1,
        height: 0.6,
        backgroundColor: "#878787"
    }),

    LabelText: styled(Text, {
        fontSize: "$5",
        fontWeight: "600",
        color: "#878787",
        paddingHorizontal: "$2"
    }),

    Content: styled(YStack, {
        gap: "$2"
    })
};