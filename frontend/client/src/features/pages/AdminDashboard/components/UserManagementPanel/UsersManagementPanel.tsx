import { useCallback } from "react";
import { Button, Stack, Table } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import { useAllUsers } from "./hooks/useAllUsers";
import { UserDetails } from "../../../../../common/auth";
import { ErrorMessage } from "../../../../../common/components/DataDisplay";
import { SearchBar } from "../../../../../common/components/DataInput";
import { useTranslate } from "../../../../../common/i18n";
import { NAVIGATION_SHELL_TOTAL_HEIGHT } from "../../../../navigation/Shell/AppNavigation";
import { UserManagementPanelHeader, UserRow, UserRowsLoader } from "./components";
import { useUsersManagementModalEvents, useUsersManagementPanelSortAndSearch } from "./hooks";

import classes from "./UserManagementPanel.module.scss";

export type UserManagementEvents = {
    onDelete: () => void;
    onUserRoleChange: () => void;
    onUserReservationsPermissionToggle: () => void;
};

export const UsersManagementPanel = () => {
    const { users, error, isLoading, refetch } = useAllUsers();
    const { sortBy, onSort, sortDirection, data, onSearch } = useUsersManagementPanelSortAndSearch(users ?? []);
    const { onUserDelete, onUserRoleChange, onUserReservationsPermissionToggle } = useUsersManagementModalEvents();
    const translate = useTranslate();
    const { height } = useViewportSize();
    const scrollContainerHeight = height - NAVIGATION_SHELL_TOTAL_HEIGHT;

    const onUserRoleChangeInternal = useCallback(
        (user: UserDetails) => {
            return onUserRoleChange(user, user.role === "Admin" ? "User" : "Admin");
        },
        [onUserRoleChange]
    );

    return (
        <Table.ScrollContainer minWidth={800} h={scrollContainerHeight} className={classes.scrollContainer}>
            <SearchBar
                placeholder={translate("pages.adminDashboard.usersPanel.search.placeholder")}
                onSearch={onSearch}
            />

            <Table stickyHeader highlightOnHover className={classes.table}>
                <UserManagementPanelHeader sortBy={sortBy} onSort={onSort} sortDirection={sortDirection} />
                <Table.Tbody>
                    {isLoading ? (
                        <UserRowsLoader />
                    ) : (
                        data.map((user) => (
                            <UserRow
                                key={user.id}
                                userDetails={user}
                                events={{
                                    onDelete: () => onUserDelete(user),
                                    onUserRoleChange: () => onUserRoleChangeInternal(user),
                                    onUserReservationsPermissionToggle: () => onUserReservationsPermissionToggle(user),
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
    );
};
