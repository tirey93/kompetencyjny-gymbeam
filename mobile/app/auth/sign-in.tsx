import { Stack } from "expo-router";

import { SignInForm } from "@/features/auth/components/SignInForm/SignInForm";
import { H2, styled, View } from "tamagui";

export default function LoginScreen() {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <Styled.Container>
                <Styled.Header>Sign in.</Styled.Header>
                <SignInForm />
            </Styled.Container>
        </>
    );
}

const Styled = {
    Container: styled(View, {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: "$6",
    }),
    Header: styled(H2, {
        fontWeight: 700,
        width: "100%",
        marginBottom: "$4",
    }),
};