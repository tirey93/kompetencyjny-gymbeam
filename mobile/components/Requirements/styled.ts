import { SizableText, styled, View } from "tamagui";

export const StyledRequirements = {
    Container: styled(View, {}),
    Item: styled(View, {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "$1",
    }),
    Requirement: styled(SizableText, {
        fontSize: "$2",
        variants: {
            withError: {
                true: {
                    color: "$danger10",
                    fontWeight: 600,
                },
                false: {
                    color: "$color10",
                },
            },
        } as const,
    }),
};
