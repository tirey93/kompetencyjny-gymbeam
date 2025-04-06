import { SizableText, styled, View } from "tamagui";

export const StyledActivitySchedule = {
    Container: styled(View, {
        flex: 1,
        paddingHorizontal: "$3.5",
        paddingBottom: "$3",
    }),

    Date: styled(SizableText, {
        fontSize: "$6",
        fontWeight: "bold",
        color: "$color10",
        paddingBlock: "$4",
        backgroundColor: "$background",
    }),

    SectionSeparator: styled(View, {
        height: "$0.25",
    }),

    ItemSeparator: styled(View, {
        height: "$0.75",
    }),
};
