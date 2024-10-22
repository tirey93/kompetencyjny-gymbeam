import { Box, Table } from "@mantine/core";

import { UserRow } from "./components/UserRow/UserRow";
import { useUsersColumnsConfig } from "./hooks/useUsersColumnsConfig";
import { UserManagementEvents } from "./types";

import classes from "./UsersTable.module.scss";

import { SearchBar } from "@/components/DataInput";
import { NoResultsMessage, SortableTableHeader } from "@/components/Table";
import { useSearchAndSort } from "@/hooks";
import { useTranslate } from "@/lib/i18n";
import { UserDetails } from "@/types";

type UsersTableProps = {
    users: UserDetails[];
    events: UserManagementEvents;
};

export const UsersTable = ({ users, events }: UsersTableProps) => {
    const translate = useTranslate();
    const columns = useUsersColumnsConfig();

    const { sortBy, onSort, sortDirection, data, onSearch } = useSearchAndSort<UserDetails>({
        dataToProcess: users ?? [],
        predicates: ["name", "displayName"],
    });

    if (!data.length) {
        return <NoResultsMessage description={translate("pages.usersDashboard.noResults.description")} />;
    }

    return (
        <Box className={classes.container}>
            <SearchBar
                placeholder={translate("pages.usersDashboard.search.placeholder")}
                onSearch={onSearch}
                className={classes.searchBar}
            />
            <Table.ScrollContainer minWidth={200} className={classes.scrollContainer}>
                <Table stickyHeader highlightOnHover className={classes.table}>
                    <SortableTableHeader
                        columns={columns}
                        sortDirection={sortDirection}
                        sortBy={sortBy}
                        onSort={onSort}
                    />
                    <Table.Tbody>
                        {data.map((user) => (
                            <UserRow key={user.id} userDetails={user} events={events} />
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Box>
    );
};
