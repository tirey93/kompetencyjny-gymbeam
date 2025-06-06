import { useCallback } from "react";
import { router, Stack } from "expo-router";
import { toast } from "sonner-native";
import { H2, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { Screens } from "@/constants/Screens";
import { useSignIn } from "@/features/auth";
import { SignInFormInputs } from "@/features/auth/components/SignInForm/hooks/useSignInForm";
import { SignInForm } from "@/features/auth/components/SignInForm/SignInForm";

export default function LoginScreen() {
    const { signIn, isPending } = useSignIn();

    const onSubmit = useCallback(
        async ({ login, password }: SignInFormInputs) => {
            try {
                const user = await signIn({ username: login, password });
                toast.success(`Welcome back, ${user.name}.`);
                router.replace(Screens.GymPass);
            } catch {
                toast.error("Incorrect login or password.");
            }
        },
        [signIn]
    );

    return (
        <ScreenContainer>
            <Stack.Screen options={{ headerShown: false }} />
            <Styled.Container>
                <Styled.Header>Sign in.</Styled.Header>
                <SignInForm onSubmit={onSubmit} isLoading={isPending} />
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
