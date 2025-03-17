import { Link } from "expo-router";
import { Button, H1, SizableText, styled, View, YStack } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { Screens } from "@/constants/Screens";

export default function Screen() {
    return (
        <ScreenContainer>
            <Styled.View>
                <Styled.VerticalStack theme="dark">
                    <Styled.Header>GymBeam</Styled.Header>
                    <Link href={Screens.SignIn} asChild>
                        <Styled.Button theme="accent">Sign in</Styled.Button>
                    </Link>
                    <Link href={Screens.SignUp} asChild>
                        <Styled.Button>Create new account</Styled.Button>
                    </Link>
                </Styled.VerticalStack>
            </Styled.View>
        </ScreenContainer>
    );
}

const Styled = {
    View: styled(View, {
        backgroundColor: "$background",
    }),
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
