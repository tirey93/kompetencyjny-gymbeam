import { useState } from "react";
import { Tabs } from "expo-router";
import { Button, Sheet, SizableText, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { QRScanner } from "@/features/gym-pass/components/QRScanner/QRScanner";

export default function Screen() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <ScreenContainer>
            <Tabs.Screen options={{ title: "GymPass", headerShown: false }} />
            <Styled.View>
                <SizableText>GymPass</SizableText>
                <Button onPress={() => setIsSheetOpen(true)}>Scan QR</Button>

                <Sheet modal open={isSheetOpen} onOpenChange={setIsSheetOpen} snapPoints={[100]} dismissOnSnapToBottom>
                    <Sheet.Frame>
                        <Sheet.Handle />
                        <QRScanner isActive={isSheetOpen} onClose={() => setIsSheetOpen(false)} />
                    </Sheet.Frame>
                </Sheet>
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
