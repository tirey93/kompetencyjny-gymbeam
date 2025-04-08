import { styled, YStack } from "tamagui";

export const SignUpFormStyled = {
    ButtonsContainer: styled(YStack, {
        alignSelf: "center",
        marginTop: "$4",
        gap: "$2",
        width: "100%",
    }),
    InputsContainer: styled(YStack, {
        alignSelf: "center",
        marginTop: "$2",
        width: "100%",
    }),
};
