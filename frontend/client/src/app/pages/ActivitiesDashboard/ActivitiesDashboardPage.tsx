import { Container } from "@mantine/core";

import classes from "./ActivitiesDashboardPage.module.scss";

import { ErrorScreen, LoaderOverlay } from "@/components/DataDisplay";
import { ActivitiesTable, useActivities, useActivitiesModalEvents } from "@/features/activities";
import { useTranslate } from "@/lib/i18n";

export const ActivitiesDashboardPage = () => {
    const { activities, isLoading, error, refetch } = useActivities();
    const translate = useTranslate();
    const { openAddModal, openDeleteModal } = useActivitiesModalEvents();

    if (isLoading) {
        return <LoaderOverlay />;
    }

    if (error) {
        return (
            <ErrorScreen
                onRetry={refetch}
                description={error}
                title={translate("pages.activities.errorScreen.activities.title")}
            />
        );
    }

    return (
        <Container className={classes.container} size="xl">
            <ActivitiesTable activities={activities ?? []} onAdd={openAddModal} onDelete={openDeleteModal} />
        </Container>
    );
};
