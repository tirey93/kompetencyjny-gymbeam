import { useState } from "react";
import { Button, Text } from "react-native";
import { BarcodeScanningResult, CameraType, useCameraPermissions } from "expo-camera";
import { Flashlight, FlashlightOff, SwitchCameraIcon, XIcon } from "lucide-react-native";

import { StyledQRScanner } from "@/features/gym-pass/components/QRScanner/styled";

const ICON_SIZE = 48;
const ICON_COLOR = "white";

type QRScannerProps = {
    isActive?: boolean;
    onScanned: (result: BarcodeScanningResult) => void;
    onClose?: () => void;
};

export const QRScanner = ({ isActive, onClose, onScanned }: QRScannerProps) => {
    const [facing, setFacing] = useState<CameraType>("back");
    const [isTorchEnabled, setIsTorchEnabled] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission || !isActive) {
        return <StyledQRScanner.Container />;
    }

    if (!permission.granted) {
        // TODO: Better error screen
        return (
            <StyledQRScanner.Container>
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </StyledQRScanner.Container>
        );
    }

    const toggleCameraFacing = () => {
        setFacing((current) => (current === "back" ? "front" : "back"));
    };

    const toggleTorch = () => {
        setIsTorchEnabled((current) => !current);
    };

    const internalOnBarcodeScanned = (result: BarcodeScanningResult) => {
        if (result.type !== "qr") {
            return;
        }

        return onScanned(result);
    };

    return (
        <StyledQRScanner.Container>
            <StyledQRScanner.CameraContainer
                facing={facing}
                enableTorch={isTorchEnabled}
                onBarcodeScanned={internalOnBarcodeScanned}
            >
                <StyledQRScanner.Overlay>
                    <StyledQRScanner.ScanArea>
                        <StyledQRScanner.Corner placement="topLeft" />
                        <StyledQRScanner.Corner placement="topRight" />
                        <StyledQRScanner.Corner placement="bottomRight" />
                        <StyledQRScanner.Corner placement="bottomLeft" />
                    </StyledQRScanner.ScanArea>

                    <StyledQRScanner.IconButton slot="topRight" onPress={onClose}>
                        <XIcon color={ICON_COLOR} size={ICON_SIZE} />
                    </StyledQRScanner.IconButton>

                    <StyledQRScanner.IconButton slot="bottomRight" onPress={toggleCameraFacing}>
                        <SwitchCameraIcon color={ICON_COLOR} size={ICON_SIZE} />
                    </StyledQRScanner.IconButton>

                    <StyledQRScanner.IconButton slot="bottomLeft" onPress={toggleTorch}>
                        {isTorchEnabled ? (
                            <FlashlightOff color={ICON_COLOR} size={ICON_SIZE} />
                        ) : (
                            <Flashlight color={ICON_COLOR} size={ICON_SIZE} />
                        )}
                    </StyledQRScanner.IconButton>
                </StyledQRScanner.Overlay>
            </StyledQRScanner.CameraContainer>
        </StyledQRScanner.Container>
    );
};
