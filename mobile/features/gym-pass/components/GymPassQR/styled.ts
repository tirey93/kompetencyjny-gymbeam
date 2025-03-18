import { styled, View } from "tamagui";

export const StyledGymPassQR = {
    Container: styled(View, {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        padding: "$4",
        backgroundColor: "$color2",
        borderRadius: "$radius.5",
        borderColor: "$accentBackground",
        borderWidth: 5,
    }),
    Guard: styled(View, {
        position: "relative",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        variants: {
            isDisabled: {
                true: {
                    filter: "blur(10px)",
                },
            },
        } as const,
    }),
};
