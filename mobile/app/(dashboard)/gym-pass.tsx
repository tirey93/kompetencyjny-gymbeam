import { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { BarcodeScanningResult } from "expo-camera";
import { Tabs } from "expo-router";
import { ScanQrCodeIcon } from "lucide-react-native";
import { Button, Sheet, SizableText, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { QRScanner } from "@/features/gym-pass/components/QRScanner/QRScanner";

export default function Screen() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const hideCamera = () => {
        setIsSheetOpen(false);
    };

    const showCamera = () => {
        setIsSheetOpen(true);
    };

    useEffect(() => {
        const backAction = () => {
            if (isSheetOpen) {
                hideCamera();
                return true;
            }

            return false;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, [isSheetOpen]);

    const handleQRScan = (result: BarcodeScanningResult) => {
        // TODO: Handle QR scan once endpoint is ready
        hideCamera();
        console.log(result.data);
    };

    return (
        <ScreenContainer>
            <Tabs.Screen options={{ title: "GymPass", headerShown: false }} />
            <Styled.View>
                <SizableText>GymPass</SizableText>
                <Styled.ScanQRButton onPress={showCamera} iconAfter={<ScanQrCodeIcon size={24} />} theme="accent">
                    Verify QR
                </Styled.ScanQRButton>

                <Sheet modal dismissOnSnapToBottom open={isSheetOpen} onOpenChange={setIsSheetOpen} snapPoints={[100]}>
                    <Sheet.Frame>
                        <Sheet.Handle />
                        <QRScanner isActive={isSheetOpen} onClose={hideCamera} onScanned={handleQRScan} />
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
    ScanQRButton: styled(Button, {
        minWidth: "90%",
        fontWeight: 700,
        fontSize: "$6",
    }),
};
