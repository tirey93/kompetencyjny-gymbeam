import { Input, Label, SizableText, styled } from "tamagui";

export const StyledTextInput = {
    Input: styled(Input, {
        borderWidth: "$0.25",

        variants: {
            withError: {
                true: {
                    borderColor: "$error10",
                },
            },
        } as const,
    }),
    Error: styled(SizableText, {
        color: "$error10",
    }),
    Label: styled(Label, {
        fontWeight: 700,
        fontSize: "$3",
        marginBottom: "$-2",
    }),
};
