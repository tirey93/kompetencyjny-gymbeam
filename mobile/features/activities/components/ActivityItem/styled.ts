import { ChevronRightIcon } from "lucide-react-native";
import { Card, SizableText, styled, View } from "tamagui";

export const StyledActivityItem = {
    Container: styled(Card, {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "$neutral3",
        borderColor: "$neutral4",
        borderWidth: "$1",
        gap: "$4",
        alignItems: "center",
        height: 80,
        padding: "$2",
        width: "100%",
        animation: "bouncy",
        hoverStyle: { scale: 1.05 },
        pressStyle: { scale: 0.9 },
    }),

    Name: styled(SizableText, {
        fontSize: "$7",
        fontWeight: "bold",
    }),

    IconContainer: styled(View, {
        borderRadius: "$2",
        padding: "$4",
        backgroundColor: "$neutral2",
    }),

    ChevronIcon: styled(ChevronRightIcon, {
        marginLeft: "auto",
        marginRight: "$2",
        color: "$secondary10",
    }),
};
