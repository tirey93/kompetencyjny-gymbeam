import { Container } from "@mantine/core";

import classes from "./ActivitiesPage.module.scss";

import { ErrorScreen, LoaderOverlay } from "@/components/DataDisplay";
import { useActivities, useActivitiesInstances } from "@/features/activities";
import { ActivityCalendar } from "@/features/activities/components/ActivityCalendar";
import { useCalendarDateRange } from "@/hooks";
import { useTranslate } from "@/lib/i18n";

export const ActivitiesPage = () => {
    const translate = useTranslate();
    const dateRangeOptions = useCalendarDateRange();

    const {
        activitiesInstances,
        isLoading: areInstancesLoading,
        error: instancesError,
        refetch: refetchInstances,
    } = useActivitiesInstances({ type: "ByDateRange", dateRange: dateRangeOptions.dateRange });

    const {
        activities,
        isLoading: areActivitiesLoading,
        error: activitiesError,
        refetch: refetchActivities,
    } = useActivities();

    if (areActivitiesLoading) {
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
            {activities && (
                <ActivityCalendar
                    isLoading={areInstancesLoading}
                    activityInstances={activitiesInstances ?? []}
                    activities={activities}
                    dateRangeOptions={dateRangeOptions}
                    withFilters
                />
            )}
        </Container>
    );
};