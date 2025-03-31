import { styled, View, Text, XStack, YStack } from "tamagui";

export const ReservationItemCardStyled = {
    Card: styled(View, {
        backgroundColor: "$color3",
        padding: "$3",
        paddingTop: "$3",
        paddingBottom: "$4",
        borderRadius: "$2",
        marginBottom: "$3",
        borderLeftWidth: "$2",
        borderLeftColor: "transparent",
        pressStyle: {
            borderLeftColor: "orange",
            backgroundColor: "$color4",
        },
    }),
    HeaderRow: styled(XStack, {
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "$3",
    }),
    TitleText: styled(Text, {
        fontSize: "$5",
        fontWeight: "bold",
        color: "white",
    }),
    DetailText: styled(Text, {
        fontSize: "$3",
        color: "white",
    }),
    DetailRow: styled(XStack, {
        alignItems: "center",
        gap: "$2",
        width: "100%",
    }),
    DetailsContainer: styled(XStack, {
        flexWrap: "wrap",
    }),
    DetailsColumn: styled(YStack, {
        width: "50%",
        gap: "$2",
        paddingRight: "$3",
    }),
    CloseButton: styled(XStack, {
        borderRadius: "$4",
        hoverStyle: {
            backgroundColor: "white",
        },
        pressStyle: {
            backgroundColor: "pink",
        },
    }),
    CloseButtonInner: styled(XStack, {
        padding: "$2",
    }),
};
