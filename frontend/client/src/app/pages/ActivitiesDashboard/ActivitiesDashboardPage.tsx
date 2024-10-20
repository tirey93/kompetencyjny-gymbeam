import { Button, Container, Group, Table } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import classes from "./ActivitiesDashboardPage.module.scss";

import { ActivityRow } from "@/app/pages/ActivitiesDashboard/components";
import { useActivitiesColumnsConfig } from "@/app/pages/ActivitiesDashboard/hooks/useActivitiesColumnsConfig";
import { useActivitiesModalEvents } from "@/app/pages/ActivitiesDashboard/hooks/useActivitiesModalEvents";
import { ErrorScreen, LoaderOverlay } from "@/components/DataDisplay";
import { SearchBar } from "@/components/DataInput";
import { NoResultsMessage, SortableTableHeader } from "@/components/Table";
import { useActivities } from "@/features/activities";
import { useSearchAndSort } from "@/hooks";
import { useTranslate } from "@/lib/i18n";
import { Activity } from "@/types";

export const ActivitiesDashboardPage = () => {
    const columnsConfig = useActivitiesColumnsConfig();
    const { activities, isLoading, error, refetch } = useActivities();
    const translate = useTranslate();
    const { openAddModal, openDeleteModal } = useActivitiesModalEvents();

    const { sortBy, onSort, sortDirection, data, onSearch } = useSearchAndSort<Activity>({
        dataToProcess: activities ?? [],
        predicates: ["name"],
    });

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
            <Group>
                <SearchBar
                    placeholder={translate("pages.activitiesDashboard.searchBar.placeholder")}
                    onSearch={onSearch}
                    className={classes.searchBar}
                />
                <Button rightSection={<IconPlus />} variant="light" color="success" onClick={() => openAddModal()}>
                    {translate("pages.activitiesDashboard.addNewButton")}
                </Button>
            </Group>

            <Table.ScrollContainer minWidth={200}>
                <Table stickyHeader highlightOnHover className={classes.table}>
                    <SortableTableHeader
                        columns={columnsConfig}
                        sortDirection={sortDirection}
                        sortBy={sortBy}
                        onSort={onSort}
                    />
                    <Table.Tbody>
                        {data.map((item) => (
                            <ActivityRow
                                key={item.id}
                                activity={item}
                                onEdit={openAddModal}
                                onDelete={openDeleteModal}
                            />
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>

            {!data.length && (
                <NoResultsMessage
                    description={translate("pages.activitiesDashboard.noResults.description")}
                    onActionButtonClick={() => openAddModal()}
                />
            )}
        </Container>
    );
};
