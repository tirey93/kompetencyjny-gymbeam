import React from "react";
import { Tabs, useLocalSearchParams } from "expo-router";
import { SizableText, styled, View } from "tamagui";

import { ActivitySchedule } from "@/features/activities/components/ActivitySchedule/ActivitySchedule";

export default function Screen() {
    const { name } = useLocalSearchParams<{ name: string }>();

    return (
        <Styled.OuterContainer>
            <Tabs.Screen options={{ title: name, headerShown: false }} />
            <Styled.Header>{name}</Styled.Header>
            <ActivitySchedule />
        </Styled.OuterContainer>
    );
}

const Styled = {
    OuterContainer: styled(View, {
        flex: 1,
        backgroundColor: "$background",
    }),
    InnerContainer: styled(View, {
        flex: 1,
    }),
    Header: styled(SizableText, {
        fontSize: "$8",
        fontWeight: "bold",
        paddingTop: "$6",
        paddingBottom: "$2",
        paddingHorizontal: "$4",
        color: "$secondary11",
        textTransform: "uppercase",
    }),
};
