import { Link, Tabs } from "expo-router";
import { LogOutIcon } from "lucide-react-native";
import { Button, SizableText, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { Screens } from "@/constants/Screens";
import { useSignOut } from "@/features/auth";

export default function Screen() {
    const { signOut } = useSignOut();

    return (
        <ScreenContainer>
            <Tabs.Screen options={{ title: "Profile", headerShown: false }} />
            <Styled.View>
                <SizableText>Profile</SizableText>
                <Styled.Button theme="danger" iconAfter={<LogOutIcon />} onPress={signOut}>
                    Sign out
                </Styled.Button>
                <Link href={Screens.ChangePassword} asChild>
                    <Styled.Button>Change Password</Styled.Button>
                </Link>
            </Styled.View>
        </ScreenContainer>
    );
}

const Styled = {
    View: styled(View, {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "$background",
        minHeight: "100%",
    }),
    Button: styled(Button, {
        minWidth: "90%",
        fontWeight: 700,
    }),
};
