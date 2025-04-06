import React, { useMemo } from "react";
import { RefreshControl, SectionList } from "react-native";
import dayjs from "dayjs";
import { SizableText } from "tamagui";

import { ActivityInstanceItem } from "@/features/activities/components/ActivityInstanceItem/ActivityInstanceItem";
import { StyledActivitySchedule } from "@/features/activities/components/ActivitySchedule/styled";
import { ActivityInstance } from "@/types";

const DATE_FORMAT = "DD/MM/YYYY";

type ActivityScheduleProps = {
    activities: ActivityInstance[];
    onRefresh: () => void;
    isLoading: boolean;
};

export const ActivitySchedule = ({ activities, onRefresh, isLoading }: ActivityScheduleProps) => {
    const sections = useMemo(() => {
        const sections: Map<string, ActivityInstance[]> = new Map();

        activities.forEach((activity) => {
            const key = dayjs(activity.startTime).format(DATE_FORMAT);

            if (sections.has(key)) {
                sections.get(key)?.push(activity);
            } else {
                sections.set(key, [activity]);
            }
        });

        return [...sections].map(([key, entries]) => ({ title: key, data: entries }));
    }, [activities]);

    return (
        <StyledActivitySchedule.Container>
            <SectionList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
                maxToRenderPerBatch={10}
                sections={sections}
                renderItem={onRenderItem}
                renderSectionHeader={onRenderSectionHeader}
                keyExtractor={getCompositeKey}
                stickySectionHeadersEnabled
                SectionSeparatorComponent={StyledActivitySchedule.SectionSeparator}
                ItemSeparatorComponent={StyledActivitySchedule.ItemSeparator}
                ListFooterComponent={ListFooter}
            />
        </StyledActivitySchedule.Container>
    );
};

const getCompositeKey = (item: ActivityInstance) => `${item.activityId}_${item.startTime}_${item.duration}`;

const onRenderItem = ({ item }: { item: ActivityInstance }) => <ActivityInstanceItem activity={item} />;

const onRenderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <StyledActivitySchedule.Date>{title}</StyledActivitySchedule.Date>
);

const ListFooter = () => (
    <StyledActivitySchedule.Footer>
        <SizableText>That is all. All activities are published in 4 weeks advance.</SizableText>
    </StyledActivitySchedule.Footer>
);
