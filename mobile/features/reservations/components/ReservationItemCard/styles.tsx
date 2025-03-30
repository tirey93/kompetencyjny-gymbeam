import { styled, View, Text, XStack } from "tamagui";

export const ReservationItemCardStyled = {
    Card: styled(View, {
        backgroundColor: "#24211E",
        padding: 16,
        paddingTop: 10,
        borderRadius: 8,
        marginBottom: 12,
        borderLeftWidth: 3,
        borderLeftColor: "transparent",
        pressStyle: {
            borderLeftColor: "#FAB565",
            backgroundColor: "#3f3f3f"
        }
    }),
    TitleText: styled(Text, {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF"
    }),
    DetailText: styled(Text, {
        fontSize: 12
    }),
    DetailRow: styled(XStack, {
        alignItems: "center",
        gap: 8,
        width: '100%'
    }),
    CloseButton: styled(XStack, {
        borderRadius: 999,
        hoverStyle: {
            backgroundColor: "#fff2f0"
        },
        pressStyle: {
            backgroundColor: "#ffccc7"
        }
    }),
    CloseButtonInner: styled(XStack, {
        padding: "$2"
    })
};