import { styled } from "@tamagui/core";
import { Button, View } from "tamagui";

export const StyledReservationButton = {
    Wrapper: styled(View, {
        marginLeft: "$4",
        justifyContent: "center",
    }),

    Button: styled(Button, {
        backgroundColor: "$accent8",
        color: "white",
        paddingHorizontal: "$4",
        paddingVertical: "$1",
        borderRadius: "$2",
        fontSize: "$4",
    }),
};
