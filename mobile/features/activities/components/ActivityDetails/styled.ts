import { SizableText, styled, View } from "tamagui";

export const StyledActivityDetails = {
    Container: styled(View, {
        flex: 1,
        width: "100%",
        padding: "$8",
    }),
    ActivityName: styled(SizableText, {
        fontSize: "$8",
        fontWeight: "bold",
        color: "$secondary11",
        textTransform: "uppercase",
    }),
};
