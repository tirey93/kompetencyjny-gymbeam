import { Button, Container, Group, Table } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import { useActivitiesColumnsConfig } from "./hooks/useActivitiesColumnsConfig";
import { useActivitiesModalEvents } from "./hooks/useActivitiesModalEvents";
import { Activity } from "../../../common/activities/Activities";
import { useActivities } from "../../../common/activities/hooks/useActivities";
import { LoaderOverlay } from "../../../common/components/DataDisplay";
import { SearchBar } from "../../../common/components/DataInput";
import { SortableTableHeader } from "../../../common/components/Table";
import { useSearchAndSort } from "../../../common/hooks";
import { useTranslate } from "../../../common/i18n";
import { ActivityRow } from "./components";

import classes from "./ActivitiesDashboardPage.module.scss";

export const ActivitiesDashboardPage = () => {
    const columnsConfig = useActivitiesColumnsConfig();
    const { activities, isLoading, error } = useActivities();
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
        return <>{error}</>; // TODO: Hubert - display proper error message
    }

    return (
        <Container className={classes.container} size="xl">
            <Group>
                <SearchBar placeholder="Test" onSearch={onSearch} className={classes.searchBar} />
                <Button rightSection={<IconPlus />} variant="light" color="success" onClick={() => openAddModal()}>
                    {translate("pages.activitiesDashboard.addNewButton")}
                </Button>
            </Group>

            <Table.ScrollContainer minWidth={200}>
                <Table stickyHeader highlightOnHover>
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
        </Container>
    );
};
