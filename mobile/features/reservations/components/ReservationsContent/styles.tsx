import { Button, styled, Text, View } from "tamagui";

export const ReservationsContentStyled = {
    View: styled(View, {
        minHeight: "100%",
        flex: 1,
        padding: "$4",
        alignItems: "center",
        justifyContent: "center",
    }),
    HeaderText: styled(Text, {
        fontSize: "$6",
        fontWeight: "700",
        marginBottom: "$2",
        color: "white",
    }),
    SubText: styled(Text, {
        fontSize: "$3",
        color: "$color11",
        marginBottom: "$4",
    }),
    Button: styled(Button, {
        backgroundColor: "green",
        paddingVertical: "$3",
        paddingHorizontal: "$5",
        borderRadius: "$12",
    }),
    ButtonText: styled(Text, {
        color: "white",
        fontSize: "$5",
    }),
};
