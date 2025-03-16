import { Stack } from "expo-router";
import { H2, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { SignUpForm } from "@/features/auth/components/SignUpForm/SignUpForm";

export default function Screen() {
    return (
        <ScreenContainer>
            <Stack.Screen options={{ headerShown: false }} />
            <Styled.Container>
                <Styled.Header>Create account.</Styled.Header>
                <SignUpForm />
            </Styled.Container>
        </ScreenContainer>
    );
}

const Styled = {
    Container: styled(View, {
        backgroundColor: "$background",
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
