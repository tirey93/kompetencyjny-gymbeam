import { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { BarcodeScanningResult } from "expo-camera";
import { Tabs } from "expo-router";
import { ScanQrCodeIcon } from "lucide-react-native";
import { toast } from "sonner-native";
import { Button, Sheet, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { useAuthState } from "@/features/auth";
import { GymPassInfo } from "@/features/gym-pass/components/GymPassInfo/GymPassInfo";
import { GymPassQR } from "@/features/gym-pass/components/GymPassQR/GymPassQR";
import { QRScanner } from "@/features/gym-pass/components/QRScanner/QRScanner";
import { ScanResult } from "@/features/gym-pass/components/ScanResult/ScanResult";
import { Timestamp } from "@/features/gym-pass/components/Timestamp/Timestamp";
import { GymPassEncoder } from "@/features/gym-pass/services/GymPassEncoder";
import { User } from "@/types";

export default function Screen() {
    const { user } = useAuthState();
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [scanResult, setScanResult] = useState<User | null>(null);

    const hideCamera = () => {
        setIsScannerOpen(false);
    };

    const hideScanResult = () => {
        setScanResult(null);
    };

    const showCamera = () => {
        setIsScannerOpen(true);
        setScanResult(null);
    };

    useEffect(() => {
        const backAction = () => {
            if (scanResult) {
                hideCamera();
                hideScanResult();
                return true;
            }

            return false;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, [scanResult]);

    const handleQRScan = (result: BarcodeScanningResult) => {
        try {
            const decodedUser = GymPassEncoder.decode(result.data);
            setScanResult(decodedUser);
        } catch (error) {
            toast.error("Invalid QR code.");
        } finally {
            hideCamera();
        }
    };

    if (!user) {
        return <ScreenContainer />;
    }

    return (
        <ScreenContainer>
            <Tabs.Screen options={{ title: "GymPass", headerShown: false }} />
            <Styled.ContentWrapper>
                <Timestamp />

                <Styled.GymPass>
                    <GymPassQR owner={user} />
                    <GymPassInfo owner={user} />
                </Styled.GymPass>

                <Styled.ButtonsWrapper>
                    <Styled.ScanQRButton onPress={showCamera} iconAfter={<ScanQrCodeIcon size={24} />} theme="accent">
                        Scan QR
                    </Styled.ScanQRButton>
                </Styled.ButtonsWrapper>

                <Sheet
                    modal
                    dismissOnSnapToBottom
                    open={isScannerOpen}
                    onOpenChange={setIsScannerOpen}
                    snapPoints={[100]}
                >
                    <Sheet.Frame>
                        <Sheet.Handle />
                        <QRScanner isActive={isScannerOpen} onClose={hideCamera} onScanned={handleQRScan} />
                    </Sheet.Frame>
                </Sheet>

                <Sheet modal dismissOnSnapToBottom open={!!scanResult} onOpenChange={hideScanResult} snapPoints={[100]}>
                    <Sheet.Frame>
                        <Sheet.Handle />
                        <ScanResult userData={user} />
                    </Sheet.Frame>
                </Sheet>
            </Styled.ContentWrapper>
        </ScreenContainer>
    );
}

const Styled = {
    GymPass: styled(View, {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "$color4",
        borderRadius: "$radius.4",
        overflow: "hidden",
        width: "100%",
        maxWidth: 300,
    }),
    ContentWrapper: styled(View, {
        gap: "$2",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "$background",
        minHeight: "100%",
        paddingHorizontal: "$4",
    }),
    ScanQRButton: styled(Button, {
        fontWeight: 700,
        fontSize: "$6",
        width: "100%",
    }),
    ButtonsWrapper: styled(View, {
        width: "100%",
        maxWidth: 300,
    }),
};
