import React from "react";
import { Clock, User, Users } from "@tamagui/lucide-icons";
import dayjs from "dayjs";

import { StyledActivityInstanceItem } from "@/features/activities/components/ActivityInstanceItem/styled";
import { ActivityInstance } from "@/types";

const ICON_SIZE = 16;

type ActivityInstanceItemProps = {
    activity: ActivityInstance;
};

export const ActivityInstanceItem = ({ activity }: ActivityInstanceItemProps) => {
    const startTime = new Date(activity.startTime);
    const endTime = new Date(startTime.getTime() + activity.duration * 60000);

    const startTimeString = startTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const endTimeString = endTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const isExpired = dayjs(activity.startTime).isBefore(dayjs());

    return (
        <StyledActivityInstanceItem.Card isExpired={isExpired}>
            <StyledActivityInstanceItem.Column>
                <StyledActivityInstanceItem.Row>
                    <Clock size={ICON_SIZE} color="$accent8" />
                    <StyledActivityInstanceItem.Text>
                        {startTimeString} - {endTimeString}
                    </StyledActivityInstanceItem.Text>
                </StyledActivityInstanceItem.Row>

                <StyledActivityInstanceItem.Row>
                    <Users size={ICON_SIZE} color="$accent8" />
                    <StyledActivityInstanceItem.Text>
                        {activity.slotsTaken}/{activity.totalCapacity} slots
                    </StyledActivityInstanceItem.Text>
                </StyledActivityInstanceItem.Row>

                <StyledActivityInstanceItem.Row>
                    <User size={ICON_SIZE} color="$accent8" />
                    <StyledActivityInstanceItem.Text>{activity.leaderName}</StyledActivityInstanceItem.Text>
                </StyledActivityInstanceItem.Row>
            </StyledActivityInstanceItem.Column>
        </StyledActivityInstanceItem.Card>
    );
};
