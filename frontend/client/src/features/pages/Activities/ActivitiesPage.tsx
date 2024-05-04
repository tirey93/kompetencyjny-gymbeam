import { Container } from "@mantine/core";

import { useActivities, useActivitiesInstances } from "../../../common/activities";
import { ActivityCalendar } from "../../../common/components/ActivityCalendar";
import { LoaderOverlay } from "../../../common/components/DataDisplay";
import { useCalendarDateRange } from "../../../common/hooks";

import classes from "./ActivitiesPage.module.scss";

export const ActivitiesPage = () => {
    const { dateRange } = useCalendarDateRange();
    const {
        activitiesInstances,
        isLoading: areInstancesLoading,
        error: instancesError,
    } = useActivitiesInstances({ dateRange });
    const { activities, isLoading: areActivitiesLoading, error: activitiesError } = useActivities();

    if (areActivitiesLoading || areInstancesLoading) {
        return <LoaderOverlay />;
    }

    if (instancesError) {
        return <>{instancesError}</>; // TODO: Hubert - display proper error message
    }

    if (activitiesError) {
        return <>{activitiesError}</>; // TODO: Hubert - display proper error message
    }

    return (
        <Container size="xl" className={classes.container}>
            {activitiesInstances && activities && (
                <ActivityCalendar activityInstances={activitiesInstances} activities={activities} withFilters />
            )}
        </Container>
    );
};
