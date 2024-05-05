import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Container, Stack } from "@mantine/core";

import { ActivityDetailsCard } from "./components/ActivityDetailsCard/ActivityDetailsCard";
import { useActivities, useActivitiesInstances } from "../../../common/activities";
import { ActivityCalendar } from "../../../common/components/ActivityCalendar";
import { ErrorScreen, LoaderOverlay } from "../../../common/components/DataDisplay";
import { useCalendarDateRange } from "../../../common/hooks";
import { useTranslate } from "../../../common/i18n";
import { AppRoute } from "../../router";

import classes from "../Activities/ActivitiesPage.module.scss";

export const ActivityPage = () => {
    const { dateRange } = useCalendarDateRange();
    const translate = useTranslate();
    const { id } = useParams();

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

    const activity = useMemo(() => activities?.find((activity) => activity.id.toString() === id), [activities, id]);

    const instancesOfActivity = useMemo(
        () => activitiesInstances?.filter((item) => item.activityId.toString() == id),
        [activitiesInstances, id]
    );

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

    if (!activity) {
        return <Navigate to={AppRoute.NOT_FOUND} replace />;
    }

    return (
        <Container className={classes.container}>
            <Stack>
                <ActivityDetailsCard activity={activity} />
                {instancesOfActivity && activities && (
                    <ActivityCalendar activityInstances={instancesOfActivity} activities={activities} />
                )}
            </Stack>
        </Container>
    );
};
