import { Box, Table } from "@mantine/core";

import { useActivitiesColumnsConfig } from "./hooks/useActivitiesColumnsConfig";
import { Activity } from "../../../../../common/activities/Activities";
import { SortableTableHeader } from "../../../../../common/components/Table";
import { useSearchAndSort } from "../../../../../common/hooks";

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
    const { sortBy, onSort, sortDirection, data } = useSearchAndSort<Activity>({
        dataToProcess: [MOCK],
        predicates: ["name", "leaderName"],
    });

    return (
        <Box className={classes.container}>
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
                            <Table.Tr key={item.id}>
                                <Table.Td>{item.id}</Table.Td>
                                <Table.Td>{item.name}</Table.Td>
                                <Table.Td>{item.startTime.toLocaleTimeString()}</Table.Td>
                                <Table.Td>{item.endTime.toLocaleTimeString()}</Table.Td>
                                <Table.Td>{item.totalCapacity}</Table.Td>
                                <Table.Td>{item.longDescription}</Table.Td>
                                <Table.Td>{item.shortDescription}</Table.Td>
                                <Table.Td>{item.leaderName}</Table.Td>
                                <Table.Td>{item.cron}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Box>
    );
};
