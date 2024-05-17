import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mantine/core";

import { useActivitiesInstances } from "../../../common/activities";
import { ActivityItemCard } from "../../../common/components/ActivityCalendar/components/ActivityItemCard/ActivityItemCard";
import { ErrorScreen, LoaderOverlay } from "../../../common/components/DataDisplay";
import { NoResultsMessage } from "../../../common/components/Table";
import { useTranslate } from "../../../common/i18n";
import { AppRoute } from "../../router";

import classes from "./ReservationsPage.module.scss";

export const ReservationsPage = () => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const { activitiesInstances, isLoading, error, refetch } = useActivitiesInstances({ type: "ReservedByUser" });

    const openActivitiesCalendar = useCallback(() => {
        navigate(AppRoute.ACTIVITIES);
    }, [navigate]);

    if (isLoading) {
        return <LoaderOverlay />;
    }

    if (error) {
        return (
            <ErrorScreen
                onRetry={refetch}
                description={error}
                title={translate("pages.activities.errorScreen.instances.title")}
            />
        );
    }

    // TODO: Change endpoint, structure the data in better way
    return (
        <Container size="xl" className={classes.container}>
            {activitiesInstances?.map((activity) => <ActivityItemCard key={activity.activityId} {...activity} />)}

            {!activitiesInstances?.length && (
                <NoResultsMessage
                    description={translate("pages.reservations.noResults.description")}
                    actionButtonLabel={translate("pages.reservations.noResults.button")}
                    onActionButtonClick={openActivitiesCalendar}
                />
            )}
        </Container>
    );
};
