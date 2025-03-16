import { Input, SizableText, styled } from "tamagui";

export const StyledTextInput = {
    Input: styled(Input, {
        marginBottom: "$2",
        variants: {
            withError: {
                true: {
                    borderColor: "$red10",
                    borderWidth: 1,
                },
                false: {
                    borderColor: "transparent",
                },
            },
        } as const,
    }),
    Error: styled(SizableText, {
        color: "$red10",
    }),
};
