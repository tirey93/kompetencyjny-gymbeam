import { Container } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import { useActivitiesInstances } from "../../../common/activities/hooks/useActivitiesInstances";
import { ActivityCalendar, ActivityCalendarLoader } from "../../../common/components/ActivityCalendar";
import { useCalendarDateRange } from "../../../common/hooks/useCalendarDateRange";
import { NAVIGATION_SHELL_TOTAL_HEIGHT } from "../../navigation/Shell/AppNavigation";

import classes from "./ActivitiesPage.module.scss";

export const ActivitiesPage = () => {
    const { dateRange } = useCalendarDateRange();
    const { activitiesInstances, isLoading } = useActivitiesInstances({ dateRange });
    const { height } = useViewportSize();
    const calendarHeight = height - NAVIGATION_SHELL_TOTAL_HEIGHT - 20;

    return (
        <Container size="xl" className={classes.container}>
            {activitiesInstances && <ActivityCalendar activities={activitiesInstances} height={calendarHeight} />}
            {isLoading && <ActivityCalendarLoader height={calendarHeight} />}
        </Container>
    );
};
