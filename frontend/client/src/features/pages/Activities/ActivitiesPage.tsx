import { Container } from "@mantine/core";

import { useActivities } from "../../../common/activities/hooks/useActivities";
import { useActivitiesInstances } from "../../../common/activities/hooks/useActivitiesInstances";
import { ActivityCalendar, ActivityCalendarLoader } from "../../../common/components/ActivityCalendar";
import { useCalendarDateRange } from "../../../common/hooks";

import classes from "./ActivitiesPage.module.scss";

export const ActivitiesPage = () => {
    const { dateRange } = useCalendarDateRange();
    const { activitiesInstances, isLoading: areInstancesLoading } = useActivitiesInstances({ dateRange });
    const { activities, isLoading: areActivitiesLoading } = useActivities();

    return (
        <Container size="xl" className={classes.container}>
            {activitiesInstances && activities && (
                <ActivityCalendar activityInstances={activitiesInstances} activities={activities} withFilters />
            )}
            {(areActivitiesLoading || areInstancesLoading) && <ActivityCalendarLoader />}
        </Container>
    );
};
