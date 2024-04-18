import { Container } from "@mantine/core";

import { useActivitiesInstances } from "../../../common/activities/hooks/useActivitiesInstances";
import { ActivityCalendar, ActivityCalendarLoader } from "../../../common/components/ActivityCalendar";
import { useCalendarDateRange } from "../../../common/hooks";

import classes from "./ActivitiesPage.module.scss";

export const ActivitiesPage = () => {
    const { dateRange } = useCalendarDateRange();
    const { activitiesInstances, isLoading } = useActivitiesInstances({ dateRange });

    return (
        <Container size="xl" className={classes.container}>
            {activitiesInstances && <ActivityCalendar activities={activitiesInstances} />}
            {isLoading && <ActivityCalendarLoader />}
        </Container>
    );
};
