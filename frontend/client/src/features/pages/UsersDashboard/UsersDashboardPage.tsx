import { useCallback } from "react";
import { Button, Container, Stack, Table } from "@mantine/core";

import { UserDetails } from "../../../common/auth";
import { ErrorMessage } from "../../../common/components/DataDisplay";
import { SearchBar } from "../../../common/components/DataInput";
import { SortableTableHeader } from "../../../common/components/Table";
import { useAllUsers } from "../../../common/components/User";
import { useSearchAndSort } from "../../../common/hooks";
import { useTranslate } from "../../../common/i18n";
import { UserRow, UserRowsLoader } from "./components";
import { useUsersColumnsConfig, useUsersManagementModalEvents } from "./hooks";

import classes from "./UsersDashboardPage.module.scss";

export type UserManagementEvents = {
    onDelete: (user: UserDetails) => void;
    onUserRoleChange: (user: UserDetails) => void;
    onUserReservationsPermissionToggle: (user: UserDetails) => void;
};

export const UsersDashboardPage = () => {
    const translate = useTranslate();
    const columns = useUsersColumnsConfig();
    const { users, error, isLoading, refetch } = useAllUsers();
    const { onUserDelete, onUserRoleChange, onUserReservationsPermissionToggle } = useUsersManagementModalEvents();

    const { sortBy, onSort, sortDirection, data, onSearch } = useSearchAndSort<UserDetails>({
        dataToProcess: users ?? [],
        predicates: ["name", "displayName"],
    });

    const onUserRoleChangeInternal = useCallback(
        (user: UserDetails) => {
            return onUserRoleChange(user, user.role === "Admin" ? "User" : "Admin");
        },
        [onUserRoleChange]
    );

    return (
        <Container size="xl">
            <SearchBar placeholder={translate("pages.usersDashboard.search.placeholder")} onSearch={onSearch} />

            <Table.ScrollContainer minWidth={200} className={classes.scrollContainer}>
                <Table stickyHeader highlightOnHover className={classes.table}>
                    <SortableTableHeader
                        columns={columns}
                        sortDirection={sortDirection}
                        sortBy={sortBy}
                        onSort={onSort}
                    />
                    <Table.Tbody>
                        {isLoading ? (
                            <UserRowsLoader />
                        ) : (
                            data.map((user) => (
                                <UserRow
                                    key={user.id}
                                    userDetails={user}
                                    events={{
                                        onDelete: onUserDelete,
                                        onUserRoleChange: onUserRoleChangeInternal,
                                        onUserReservationsPermissionToggle: onUserReservationsPermissionToggle,
                                    }}
                                />
                            ))
                        )}
                    </Table.Tbody>
                </Table>

                {error && !isLoading && (
                    <Stack className={classes.errorContainer}>
                        <ErrorMessage>{error}</ErrorMessage>
                        <Button variant="primary" onClick={refetch}>
                            {translate("pages.usersDashboard.retryButton")}
                        </Button>
                    </Stack>
                )}
            </Table.ScrollContainer>
        </Container>
    );
};
