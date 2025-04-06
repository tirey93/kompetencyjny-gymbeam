import React from "react";
import { SectionList } from "react-native";

import { ActivityInstanceItem } from "@/features/activities/components/ActivityInstanceItem/ActivityInstanceItem";
import { StyledActivitySchedule } from "@/features/activities/components/ActivitySchedule/styled";
import { ActivityInstance } from "@/types";


const mockActivity: ActivityInstance = {
    activityId: 1,
    name: "Boxing",
    duration: 60,
    startTime: new Date(Date.now() + 60 * 1000 * 30),
    leaderId: 1,
    leaderName: "Jan Kowalski",
    reservationId: null,
    slotsTaken: 12,
    totalCapacity: 15,
    shortDescription: "Test",
    longDescription: "Test",
};

// TODO: Use real data instead of mocks
// TODO: Use auto-loader to fetch activities
export const ActivitySchedule = () => {
    const sections = [
        {
            title: "Today",
            data: [
                { ...mockActivity, id: "today-1", startTime: new Date(Date.now() - 60 * 1000 * 30) },
                { ...mockActivity, id: "today-2" },
                { ...mockActivity, id: "today-3" },
                { ...mockActivity, id: "today-4" },
            ],
        },
        {
            title: "Tomorrow",
            data: [
                { ...mockActivity, id: "tomorrow-1" },
                { ...mockActivity, id: "tomorrow-2" },
                { ...mockActivity, id: "tomorrow-3" },
                { ...mockActivity, id: "tomorrow-4" },
            ],
        },
        {
            title: "08.04.2025",
            data: [
                { ...mockActivity, id: "day3-1" },
                { ...mockActivity, id: "day3-2" },
                { ...mockActivity, id: "day3-3" },
                { ...mockActivity, id: "day3-4" },
            ],
        },
    ];

    const renderActivityItem = ({ item }: { item: ActivityInstance & { id: string } }) => (
        <ActivityInstanceItem activity={item} />
    );

    const renderDayHeader = ({ section: { title } }: { section: { title: string } }) => (
        <StyledActivitySchedule.Date>{title}</StyledActivitySchedule.Date>
    );

    const keyExtractor = (item: ActivityInstance & { id: string }) => item.id;

    return (
        <StyledActivitySchedule.Container>
            <SectionList
                sections={sections}
                renderItem={renderActivityItem}
                renderSectionHeader={renderDayHeader}
                keyExtractor={keyExtractor}
                stickySectionHeadersEnabled
                SectionSeparatorComponent={StyledActivitySchedule.SectionSeparator}
                ItemSeparatorComponent={StyledActivitySchedule.ItemSeparator}
            />
        </StyledActivitySchedule.Container>
    );
};

