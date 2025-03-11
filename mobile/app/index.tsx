import { Link, Stack } from "expo-router";
import {Button, H1, SizableText, styled, Theme, View, YStack} from "tamagui";

import { Screens } from "@/constants/Screens";

export default function Screen() {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View>
                <Styled.VerticalStack>
                    <Styled.Header>GymBeam</Styled.Header>
                    <Link href={Screens.SignIn} asChild>
                        <Styled.Button theme="accent">Sign in</Styled.Button>
                    </Link>
                    <Link href={Screens.SignUp} asChild>
                        <Styled.Button>Create new account</Styled.Button>
                    </Link>
                </Styled.VerticalStack>
            </View>
        </>
    );
}

const Styled = {
    VerticalStack: styled(YStack, {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        gap: "$2",
    }),
    Header: styled(H1, {
        fontWeight: 700,
        marginBottom: "$5",
    }),
    Text: styled(SizableText, {
        fontWeight: 700,
        fontSize: "$6",
    }),
    Button: styled(Button, {
        width: 200,
        fontWeight: 400,
    }),
};