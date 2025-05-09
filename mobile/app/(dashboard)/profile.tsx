import { Link, Tabs } from "expo-router";
import { LogOutIcon } from "lucide-react-native";
import { Button, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { Screens } from "@/constants/Screens";
import { useSignOut } from "@/features/auth";
import { useOrderMembership } from "@/features/subscriptions/hooks/useOrderMembership";

export default function Screen() {
    const { signOut } = useSignOut();
    const { orderMembership, isPending } = useOrderMembership();

    return (
        <ScreenContainer>
            <Tabs.Screen options={{ title: "Profile", headerShown: false }} />
            <Styled.View>
                <Link href={Screens.ChangePassword} asChild>
                    <Styled.Button>Change Password</Styled.Button>
                </Link>

                <Styled.Button theme="danger" iconAfter={<LogOutIcon />} onPress={signOut}>
                    Sign out
                </Styled.Button>
                <Styled.Button onPress={orderMembership}>Subscribe</Styled.Button>
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
        gap: "$2",
    }),
    Button: styled(Button, {
        minWidth: "90%",
        fontWeight: 700,
    }),
};
