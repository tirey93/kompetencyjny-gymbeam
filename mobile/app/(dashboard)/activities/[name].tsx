import React, { useMemo } from "react";
import { Tabs, useLocalSearchParams } from "expo-router";
import { SizableText, styled, View } from "tamagui";

import { useActivitiesInstances } from "@/features/activities";
import { ActivitySchedule } from "@/features/activities/components/ActivitySchedule/ActivitySchedule";
import { getDateRange } from "@/utils/dateRangeUtils";

const FOUR_WEEKS = 28;

// TODO: Loading & error state
export default function Screen() {
    const { name } = useLocalSearchParams<{ name: string }>();

    const { activitiesInstances, isLoading, refetch } = useActivitiesInstances({
        type: "ByDateRange",
        dateRange: getDateRange({ length: FOUR_WEEKS }),
    });

    // API doesn't allow to fetch instances of particular activity.
    const filteredActivityInstances = useMemo(
        () => (activitiesInstances ?? []).filter((activityInstance) => activityInstance.name === name),
        [activitiesInstances, name]
    );

    return (
        <Styled.OuterContainer>
            <Tabs.Screen options={{ title: name, headerShown: false }} />
            <Styled.Header>{name}</Styled.Header>
            <ActivitySchedule activities={filteredActivityInstances} isLoading={isLoading} onRefresh={refetch} />
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
