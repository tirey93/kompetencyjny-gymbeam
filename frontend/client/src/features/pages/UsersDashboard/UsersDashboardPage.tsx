import { useCallback } from "react";
import { Container, Table } from "@mantine/core";

import { UserDetails } from "../../../common/auth";
import { LoaderOverlay } from "../../../common/components/DataDisplay";
import { ErrorScreen } from "../../../common/components/DataDisplay/ErrorScreen/ErrorScreen";
import { SearchBar } from "../../../common/components/DataInput";
import { SortableTableHeader } from "../../../common/components/Table";
import { useSearchAndSort } from "../../../common/hooks";
import { useTranslate } from "../../../common/i18n";
import { useAllUsers } from "../../../common/users";
import { UserRow } from "./components";
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

    if (isLoading) {
        return <LoaderOverlay />;
    }

    if (error) {
        return (
            <ErrorScreen
                onRetry={refetch}
                description={error}
                title={translate("pages.usersDashboard.errorScreen.title")}
            />
        );
    }

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
                        {data.map((user) => (
                            <UserRow
                                key={user.id}
                                userDetails={user}
                                events={{
                                    onDelete: onUserDelete,
                                    onUserRoleChange: onUserRoleChangeInternal,
                                    onUserReservationsPermissionToggle: onUserReservationsPermissionToggle,
                                }}
                            />
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Container>
    );
};