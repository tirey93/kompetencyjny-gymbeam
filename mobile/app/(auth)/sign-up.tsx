import { useCallback } from "react";
import { router, Stack } from "expo-router";
import { toast } from "sonner-native";
import { H2, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { Screens } from "@/constants/Screens";
import { useSignUp } from "@/features/auth";
import { SignUpFormInputs } from "@/features/auth/components/SignUpForm/hooks/useSignUpForm";
import { SignUpForm } from "@/features/auth/components/SignUpForm/SignUpForm";

export default function Screen() {
    const { signUp, isPending } = useSignUp();

    const onSubmit = useCallback(
        async ({ login, name, ...rest }: SignUpFormInputs) => {
            try {
                const user = await signUp({ username: login, displayName: name, ...rest });
                toast.success(`Good to have you on board, ${user.name}!`);
                router.replace(Screens.GymPass);
            } catch (error) {
                const errorMessage = (error as { message?: string }).message;

                toast.error("Failed to create account", {
                    description: errorMessage,
                });
            }
        },
        [signUp]
    );

    return (
        <ScreenContainer>
            <Stack.Screen options={{ headerShown: false }} />
            <Styled.Container>
                <Styled.Header>Join us.</Styled.Header>
                <SignUpForm onSubmit={onSubmit} isLoading={isPending} />
            </Styled.Container>
        </ScreenContainer>
    );
}

const Styled = {
    Container: styled(View, {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "$background",
        padding: "$6",
    }),
    Header: styled(H2, {
        fontWeight: 700,
        width: "100%",
        marginBottom: "$4",
    }),
};
