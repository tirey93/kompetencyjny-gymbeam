import { SizableText, styled, View } from "tamagui";

import { Scrollable } from "@/components/Scrollable/Scrollable";

export const StyledActivitySchedule = {
    Container: styled(Scrollable, {
        flex: 1,
        paddingHorizontal: "$4",
        gap: "$2",
    }),

    Day: styled(View, {
        paddingHorizontal: "$4",
        paddingBottom: "$5",
        gap: "$2",
    }),

    Date: styled(SizableText, {
        fontSize: "$6",
        fontWeight: "bold",
        color: "$color10",
        paddingBottom: "$2",
    }),
};
