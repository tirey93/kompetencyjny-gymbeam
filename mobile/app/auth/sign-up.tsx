import { Stack } from "expo-router";

import { SignUpForm } from "@/features/auth/components/SignUpForm/SignUpForm";
import { H2, styled, View } from "tamagui";

export default function Screen() {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <Styled.Container>
                <Styled.Header>Create account.</Styled.Header>
                <SignUpForm />
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