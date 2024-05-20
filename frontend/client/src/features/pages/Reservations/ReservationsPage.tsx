import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Divider, Group, Stack, Title } from "@mantine/core";

import { ReservationItemCard } from "./components/ReservationItemCard/ReservationItemCard";
import { useActivitiesInstances } from "../../../common/activities";
import { ErrorScreen, LoaderOverlay } from "../../../common/components/DataDisplay";
import { NoResultsMessage } from "../../../common/components/Table";
import { useTranslate } from "../../../common/i18n";
import { AppRoute } from "../../router";

import classes from "./ReservationsPage.module.scss";

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

    // TODO: Change endpoint, structure the data in better way, do not use ActivityItemCard
    return (
        <Container size="xl" className={classes.container}>
            <Title order={4}>Your reservations</Title>

            <Stack className={classes.reservationsGroup}>
                <Divider className={classes.divider} label="Today" />
                <Group>
                    {activitiesInstances?.map((activity) => (
                        <ReservationItemCard key={activity.activityId} {...activity} />
                    ))}
                </Group>
            </Stack>

            <Stack className={classes.reservationsGroup}>
                <Divider className={classes.divider} label="This week" />
                <Group>
                    {activitiesInstances?.map((activity) => (
                        <ReservationItemCard key={activity.activityId} {...activity} />
                    ))}
                </Group>
            </Stack>

            <Stack className={classes.reservationsGroup}>
                <Divider className={classes.divider} label="Other upcoming activities" />
                <Group>
                    {activitiesInstances?.map((activity) => (
                        <ReservationItemCard key={activity.activityId} {...activity} />
                    ))}
                </Group>
            </Stack>

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
