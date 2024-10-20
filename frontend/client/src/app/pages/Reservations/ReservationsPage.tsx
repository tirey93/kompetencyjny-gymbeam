import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Anchor, Container, Title } from "@mantine/core";

import classes from "./ReservationsPage.module.scss";

import { AppRoute } from "@/app/router";
import { ErrorScreen, LoaderOverlay } from "@/components/DataDisplay";
import { NoResultsMessage } from "@/components/Table";
import { useActivitiesInstances } from "@/features/activities";
import { ReservationsList } from "@/features/reservations";
import { useTranslate } from "@/lib/i18n";

export const ReservationsPage = () => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const { activitiesInstances, isLoading, error, refetch } = useActivitiesInstances({
        type: "ReservedByUser",
    });

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

    return (
        <Container size="xl" className={classes.container}>
            <Title order={4}>{translate("pages.reservations.header")}</Title>
            <Anchor className={classes.link} onClick={openActivitiesCalendar}>
                {translate("pages.reservations.link")}
            </Anchor>

            {activitiesInstances?.length ? (
                <ReservationsList reservations={activitiesInstances} />
            ) : (
                <NoResultsMessage
                    description={translate("pages.reservations.noResults.description")}
                    actionButtonLabel={translate("pages.reservations.noResults.button")}
                    onActionButtonClick={openActivitiesCalendar}
                />
            )}
        </Container>
    );
};
