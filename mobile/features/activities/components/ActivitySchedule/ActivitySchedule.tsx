import React from "react";

import { ActivityInstanceItem } from "@/features/activities/components/ActivityInstanceItem/ActivityInstanceItem";
import { StyledActivitySchedule } from "@/features/activities/components/ActivitySchedule/styled";
import { ActivityInstance } from "@/types";

// TODO: Use real data instead of mocks
// TODO: Use auto-loader to fetch activities
export const ActivitySchedule = () => {
    return (
        <StyledActivitySchedule.Container>
            <StyledActivitySchedule.Day>
                <StyledActivitySchedule.Date>Today</StyledActivitySchedule.Date>
                <ActivityInstanceItem
                    activity={{ ...mockActivity, startTime: new Date(Date.now() - 60 * 1000 * 30) }}
                />
                <ActivityInstanceItem activity={mockActivity} />
                <ActivityInstanceItem activity={mockActivity} />
                <ActivityInstanceItem activity={mockActivity} />
            </StyledActivitySchedule.Day>

            <StyledActivitySchedule.Day>
                <StyledActivitySchedule.Date>Tomorrow</StyledActivitySchedule.Date>
                <ActivityInstanceItem activity={mockActivity} />
                <ActivityInstanceItem activity={mockActivity} />
                <ActivityInstanceItem activity={mockActivity} />
                <ActivityInstanceItem activity={mockActivity} />
            </StyledActivitySchedule.Day>

            <StyledActivitySchedule.Day>
                <StyledActivitySchedule.Date>08.04.2025</StyledActivitySchedule.Date>
                <ActivityInstanceItem activity={mockActivity} />
                <ActivityInstanceItem activity={mockActivity} />
                <ActivityInstanceItem activity={mockActivity} />
                <ActivityInstanceItem activity={mockActivity} />
            </StyledActivitySchedule.Day>
        </StyledActivitySchedule.Container>
    );
};

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
