import { Button, Group, Stack, Table } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import { useActivitiesColumnsConfig } from "./hooks/useActivitiesColumnsConfig";
import { useActivitiesModalEvents } from "./hooks/useActivitiesModalEvents";
import { Activity } from "../../../../../common/activities/Activities";
import { SearchBar } from "../../../../../common/components/DataInput";
import { SortableTableHeader } from "../../../../../common/components/Table";
import { useSearchAndSort } from "../../../../../common/hooks";
import { useTranslate } from "../../../../../common/i18n";
import { ActivityRow } from "./components";

import classes from "./ActivitiesManagementPanel.module.scss";

const MOCK: Activity = {
    name: "Boks",
    startTime: new Date(),
    endTime: new Date(),
    totalCapacity: 30,
    longDescription: "Test",
    duration: 50,
    id: 1,
    leaderId: 1,
    leaderName: "Jan Kowalski",
    shortDescription: "Test",
    cron: "* * * * *",
};

export const ActivitiesManagementPanel = () => {
    const columnsConfig = useActivitiesColumnsConfig();
    const translate = useTranslate();
    const { openAddModal, openDeleteModal } = useActivitiesModalEvents();

    const { sortBy, onSort, sortDirection, data, onSearch } = useSearchAndSort<Activity>({
        dataToProcess: [MOCK],
        predicates: ["name"],
    });

    return (
        <Stack className={classes.container}>
            <Group>
                <SearchBar placeholder="Test" onSearch={onSearch} className={classes.searchBar} />
                <Button rightSection={<IconPlus />} variant="light" color="success" onClick={() => openAddModal()}>
                    {translate("pages.adminDashboard.activitiesPanel.addNewButton")}
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
        </Stack>
    );
};
