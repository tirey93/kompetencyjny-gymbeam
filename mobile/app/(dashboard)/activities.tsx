import { Tabs } from "expo-router";
import { SizableText, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";

export default function Screen() {
    return (
        <ScreenContainer>
            <Tabs.Screen options={{ title: "Activities", headerShown: false }} />
            <Styled.View>
                <SizableText>Activities</SizableText>
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
