import { Box, Button, Group, Table } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import classes from "./ActivitiesTable.module.scss";

import { SearchBar } from "@/components/DataInput";
import { NoResultsMessage, SortableTableHeader } from "@/components/Table";
import { ActivityRow } from "@/features/activities/components/ActivitiesTable/components/ActivityRow/ActivityRow";
import { useActivitiesColumnsConfig } from "@/features/activities/components/ActivitiesTable/hooks/useActivitiesColumnsConfig";
import { useSearchAndSort } from "@/hooks";
import { useTranslate } from "@/lib/i18n";
import { Activity } from "@/types";

type ActivitiesTableProps = {
    activities: Activity[];
    onAdd: (activity?: Activity) => void;
    onDelete: (activity: Activity) => void;
};

export const ActivitiesTable = ({ activities, onAdd, onDelete }: ActivitiesTableProps) => {
    const translate = useTranslate();
    const columnsConfig = useActivitiesColumnsConfig();

    const { sortBy, onSort, sortDirection, data, onSearch } = useSearchAndSort<Activity>({
        dataToProcess: activities,
        predicates: ["name"],
    });

    return (
        <Box>
            <Group>
                <SearchBar
                    placeholder={translate("pages.activitiesDashboard.searchBar.placeholder")}
                    onSearch={onSearch}
                    className={classes.searchBar}
                />
                <Button rightSection={<IconPlus />} variant="light" color="success" onClick={() => onAdd()}>
                    {translate("pages.activitiesDashboard.addNewButton")}
                </Button>
            </Group>
            <Table.ScrollContainer minWidth={200}>
                <Table stickyHeader highlightOnHover className={classes.tableBody}>
                    <SortableTableHeader
                        columns={columnsConfig}
                        sortDirection={sortDirection}
                        sortBy={sortBy}
                        onSort={onSort}
                    />
                    <Table.Tbody>
                        {data.map((item) => (
                            <ActivityRow key={item.id} activity={item} onEdit={onAdd} onDelete={onDelete} />
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>

            {!data.length && (
                <NoResultsMessage
                    description={translate("pages.activitiesDashboard.noResults.description")}
                    onActionButtonClick={onAdd}
                />
            )}
        </Box>
    );
};
