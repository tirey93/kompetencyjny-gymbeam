import { useMemo } from "react";
import { Box } from "@mantine/core";

import { MOCK_ACTIVITIES_INSTANCES } from "./constants/MockActivitiesInstances";
import { ActivityInstance } from "../../../../activities/Activities";
import { LoaderOverlay } from "../../../DataDisplay";
import { ActivityCalendar } from "../../ActivityCalendar";

import classes from "./ActivityCalendarLoader.module.scss";

type ActivityCalendarLoaderProps = {
    height?: number | string;
};

export const ActivityCalendarLoader = ({ height }: ActivityCalendarLoaderProps) => {
    const preparedMockData = useMemo(() => {
        return Array<ActivityInstance[]>(15)
            .fill(MOCK_ACTIVITIES_INSTANCES)
            .flat()
            .map((item, index) => {
                const newDate = new Date(item.startTime);
                const today = new Date();
                const daysOffset = index % 7;
                const hoursOffset = index % 12;

                newDate.setDate(today.getDate() + daysOffset);
                newDate.setHours(newDate.getHours() + hoursOffset);
                const slotsTaken = Math.max(0, item.totalCapacity - (index % 10));

                return { ...item, startTime: newDate, slotsTaken };
            }, []);
    }, []);

    return (
        <Box className={classes.container}>
            <ActivityCalendar activities={preparedMockData} height={height} />
            <LoaderOverlay visible />
        </Box>
    );
};