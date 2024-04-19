import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Container, Stack } from "@mantine/core";

import { ActivityDetailsCard } from "./components/ActivityDetailsCard/ActivityDetailsCard";
import { useActivities } from "../../../common/activities/hooks/useActivities";
import { useActivitiesInstances } from "../../../common/activities/hooks/useActivitiesInstances";
import { ActivityCalendar, ActivityCalendarLoader } from "../../../common/components/ActivityCalendar";
import { LoaderOverlay } from "../../../common/components/DataDisplay";
import { useCalendarDateRange } from "../../../common/hooks";
import { AppRoute } from "../../router";

import classes from "../Activities/ActivitiesPage.module.scss";

export const ActivityPage = () => {
    const { dateRange } = useCalendarDateRange();
    const { activitiesInstances, isLoading: areInstancesLoading } = useActivitiesInstances({ dateRange });
    const { activities, isLoading: areActivitiesLoading } = useActivities();
    const { id } = useParams();

    const activity = useMemo(() => activities?.find((activity) => activity.id.toString() === id), [activities, id]);

    const instancesOfActivity = useMemo(
        () => activitiesInstances?.filter((item) => item.activityId.toString() == id),
        [activitiesInstances, id]
    );

    if (areActivitiesLoading) {
        return <LoaderOverlay visible />;
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
                {(areInstancesLoading || areActivitiesLoading) && <ActivityCalendarLoader />}
            </Stack>
        </Container>
    );
};
