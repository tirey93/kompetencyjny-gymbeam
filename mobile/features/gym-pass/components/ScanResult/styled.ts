import { View } from "react-native";
import { Card, SizableText, styled } from "tamagui";

export const StyledScanResult = {
    Container: styled(View, {
        name: "ScanResultContainer",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    }),

    ContentStack: styled(Card, {
        name: "ScanResultContentStack",
        padding: "$6",
        alignItems: "center",
        backgroundColor: "$secondary2",
    }),

    UserName: styled(SizableText, {
        name: "ScanResultUserName",
        size: "$8",
        fontWeight: "bold",
        textAlign: "center",
    }),

    UserLogin: styled(SizableText, {
        name: "ScanResultUserLogin",
        size: "$5",
        textAlign: "center",
        marginBottom: "$5",
    }),

    Status: styled(SizableText, {
        name: "ScanResultStatusValid",
        size: "$7",
        fontWeight: "bold",
        textAlign: "center",
        variants: {
            valid: {
                true: {
                    color: "$success10",
                },
                false: {
                    color: "$danger10",
                },
            },
        } as const,
    }),
};
