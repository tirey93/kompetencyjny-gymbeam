import { Container } from "@mantine/core";

import { useActivities, useActivitiesInstances } from "../../../common/activities";
import { ActivityCalendar } from "../../../common/components/ActivityCalendar";
import { ErrorScreen, LoaderOverlay } from "../../../common/components/DataDisplay";
import { useCalendarDateRange } from "../../../common/hooks";
import { useTranslate } from "../../../common/i18n";

import classes from "./ActivitiesPage.module.scss";

export const ActivitiesPage = () => {
    const translate = useTranslate();
    const { dateRange } = useCalendarDateRange();
    const {
        activitiesInstances,
        isLoading: areInstancesLoading,
        error: instancesError,
        refetch: refetchInstances,
    } = useActivitiesInstances({ dateRange });

    const {
        activities,
        isLoading: areActivitiesLoading,
        error: activitiesError,
        refetch: refetchActivities,
    } = useActivities();

    if (areActivitiesLoading || areInstancesLoading) {
        return <LoaderOverlay />;
    }

    if (instancesError) {
        return (
            <ErrorScreen
                onRetry={refetchInstances}
                description={instancesError}
                title={translate("pages.activities.errorScreen.instances.title")}
            />
        );
    }

    if (activitiesError) {
        return (
            <ErrorScreen
                onRetry={refetchActivities}
                description={activitiesError}
                title={translate("pages.activities.errorScreen.activities.title")}
            />
        );
    }

    return (
        <Container size="xl" className={classes.container}>
            {activitiesInstances && activities && (
                <ActivityCalendar activityInstances={activitiesInstances} activities={activities} withFilters />
            )}
        </Container>
    );
};
