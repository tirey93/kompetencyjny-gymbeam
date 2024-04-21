import { useCallback } from "react";
import { Button, Stack, Table } from "@mantine/core";

import { UserDetails } from "../../../../../common/auth";
import { ErrorMessage } from "../../../../../common/components/DataDisplay";
import { SearchBar } from "../../../../../common/components/DataInput";
import { SortableTableHeader } from "../../../../../common/components/Table";
import { useSearchAndSort } from "../../../../../common/hooks";
import { useTranslate } from "../../../../../common/i18n";
import { UserRow, UserRowsLoader } from "./components";
import { useAllUsers, useUsersColumnsConfig, useUsersManagementModalEvents } from "./hooks";

import classes from "./UserManagementPanel.module.scss";

export type UserManagementEvents = {
    onDelete: (user: UserDetails) => void;
    onUserRoleChange: (user: UserDetails) => void;
    onUserReservationsPermissionToggle: (user: UserDetails) => void;
};

export const UsersManagementPanel = () => {
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
        <>
            <SearchBar
                placeholder={translate("pages.adminDashboard.usersPanel.search.placeholder")}
                onSearch={onSearch}
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
                            {translate("pages.adminDashboard.usersPanel.retryButton")}
                        </Button>
                    </Stack>
                )}
            </Table.ScrollContainer>
        </>
    );
};
