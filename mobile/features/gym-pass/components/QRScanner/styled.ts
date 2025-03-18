import { View } from "react-native";
import { CameraView } from "expo-camera";
import { Button, styled } from "tamagui";

export const StyledQRScanner = {
    Container: styled(View, {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }),

    CameraContainer: styled(CameraView, {
        flex: 1,
        width: "100%",
    }),

    Overlay: styled(View, {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    }),

    ScanArea: styled(View, {
        position: "absolute",
        top: "30%",
        width: "75%",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
    }),

    Corner: styled(View, {
        position: "absolute",
        width: "15%",
        aspectRatio: 1,
        borderColor: "$accent6",
        variants: {
            placement: {
                topLeft: {
                    top: 0,
                    left: 0,
                    borderLeftWidth: "$2",
                    borderTopWidth: "$2",
                    borderTopLeftRadius: "$radius.3",
                },
                bottomLeft: {
                    left: 0,
                    bottom: 0,
                    borderLeftWidth: "$2",
                    borderBottomWidth: "$2",
                    borderBottomLeftRadius: "$radius.3",
                },
                topRight: {
                    top: 0,
                    right: 0,
                    borderRightWidth: "$2",
                    borderTopWidth: "$2",
                    borderTopRightRadius: "$radius.3",
                },
                bottomRight: {
                    right: 0,
                    bottom: 0,
                    borderRightWidth: "$2",
                    borderBottomWidth: "$2",
                    borderBottomRightRadius: "$radius.3",
                },
            },
        } as const,
    }),

    IconButton: styled(Button, {
        position: "absolute",
        borderRadius: "$radius.11",
        height: 65,
        width: 65,
        backgroundColor: "$background04",
        alignItems: "center",
        justifyContent: "center",
        variants: {
            slot: {
                topRight: {
                    top: "$6",
                    right: "$6",
                },
                bottomLeft: {
                    bottom: "$6",
                    left: "$6",
                },
                bottomRight: {
                    bottom: "$6",
                    right: "$6",
                },
            },
        } as const,
    }),
};
