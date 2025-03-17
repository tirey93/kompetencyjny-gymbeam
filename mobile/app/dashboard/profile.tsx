import { Tabs } from "expo-router";
import { LogOutIcon } from "lucide-react-native";
import { Button, SizableText, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { useSignOut } from "@/features/auth";

export default function Screen() {
    const { signOut } = useSignOut();

    return (
        <ScreenContainer>
            <Tabs.Screen options={{ title: "Profile", headerShown: false }} />
            <Styled.View>
                <SizableText>Profile</SizableText>
                <Styled.LogoutButton theme="danger" iconAfter={<LogOutIcon />} onPress={signOut}>
                    Sign out
                </Styled.LogoutButton>
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
    LogoutButton: styled(Button, {
        minWidth: "90%",
        fontWeight: 700,
    }),
};
