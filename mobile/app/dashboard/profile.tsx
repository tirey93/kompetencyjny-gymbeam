import { Tabs } from "expo-router";
import { SizableText, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";

export default function Screen() {
    return (
        <ScreenContainer>
            <Tabs.Screen options={{ title: "Profile", headerShown: false }} />
            <Styled.View>
                <SizableText>Profile</SizableText>
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
};
