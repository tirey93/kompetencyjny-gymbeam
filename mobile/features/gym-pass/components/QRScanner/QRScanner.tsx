import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Flashlight, FlashlightOff, SwitchCameraIcon, XIcon } from "lucide-react-native";

type QRScannerProps = {
    isActive?: boolean;
    onClose?: () => void;
};

export const QRScanner = ({ isActive, onClose }: QRScannerProps) => {
    const [facing, setFacing] = useState<CameraType>("back");
    const [isTorchEnabled, setIsTorchEnabled] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission || !isActive) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} enableTorch={isTorchEnabled}>
                <View style={styles.overlay}>
                    {/* Ramka skanowania */}
                    <View style={styles.scanArea}>
                        {/* Cztery dekoracyjne linie w rogach */}
                        <View style={[styles.corner, styles.cornerTopLeft]} />
                        <View style={[styles.corner, styles.cornerTopRight]} />
                        <View style={[styles.corner, styles.cornerBottomLeft]} />
                        <View style={[styles.corner, styles.cornerBottomRight]} />
                    </View>

                    {/* Przycisk "X" w prawym górnym rogu */}
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <XIcon size={32} color="white" />
                    </TouchableOpacity>

                    {/* Przyciski sterujące */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={toggleCameraFacing} style={styles.iconButton}>
                            <SwitchCameraIcon size={32} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setIsTorchEnabled((current) => !current)}
                            style={styles.iconButton}
                        >
                            {isTorchEnabled ? (
                                <FlashlightOff size={32} color="white" />
                            ) : (
                                <Flashlight size={32} color="white" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </CameraView>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 10,
        flexDirection: "row",
        marginBottom: 20,
        padding: 10,
    },
    camera: {
        flex: 1,
        width: "100%",
    },
    closeButton: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderRadius: 20,
        height: 40,
        justifyContent: "center",
        position: "absolute",
        right: 20,
        top: 20,
        width: 40,
    },
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    corner: {
        borderColor: "#cfb0ff",
        height: 40,
        position: "absolute",
        width: 40,
    },
    cornerBottomLeft: {
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        bottom: 0,
        left: 0,
    },
    cornerBottomRight: {
        borderBottomWidth: 4,
        borderRightWidth: 4,
        bottom: 0,
        right: 0,
    },
    cornerTopLeft: {
        borderLeftWidth: 4,
        borderTopWidth: 4,
        left: 0,
        top: 0,
    },
    cornerTopRight: {
        borderRightWidth: 4,
        borderTopWidth: 4,
        right: 0,
        top: 0,
    },
    iconButton: {
        marginHorizontal: 10,
    },
    message: {
        paddingBottom: 10,
        textAlign: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // Pokryj całą kamerę
        justifyContent: "flex-end", // Przyciski na dole ekranu
        alignItems: "center",
    },
    scanArea: {
        position: "absolute",
        top: "30%", // Wyśrodkowanie w pionie (około 30% od górnej krawędzi)
        width: 250,
        height: 250,
        justifyContent: "center", // Wyśrodkowanie elementów
        alignItems: "center",
    },
});
