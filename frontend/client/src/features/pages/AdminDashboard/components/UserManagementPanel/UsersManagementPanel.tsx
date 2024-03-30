import { useCallback } from "react";
import { Table } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import { UserDetails } from "../../../../../common/auth";
import { SearchBar } from "../../../../../common/components/DataInput";
import { useTranslate } from "../../../../../common/i18n";
import { NAVIGATION_SHELL_TOTAL_HEIGHT } from "../../../../navigation/Shell/AppNavigation";
import { UserManagementPanelHeader, UserRow } from "./components";
import { useUsersManagementModalEvents, useUsersManagementPanelSortAndSearch } from "./hooks";

const MOCK_DATA: UserDetails[] = [
    {
        id: 2,
        displayName: "Jill Jailbreaker",
        role: "User",
        name: "jj@breaker.com",
        reservationDisabled: false,
    },
    {
        id: 3,
        displayName: "Bill05",
        role: "User",
        name: "bb@gmail.com",
        reservationDisabled: true,
    },
    {
        id: 1,
        displayName: "Robert Wolfkisser",
        role: "Admin",
        name: "rob_wolf@gmail.com",
        reservationDisabled: false,
    },
];

export type UserManagementEvents = {
    onDelete: () => void;
    onUserRoleChange: () => void;
    onUserReservationsPermissionToggle: () => void;
};

export const UsersManagementPanel = () => {
    const { sortBy, onSort, sortDirection, data, onSearch } = useUsersManagementPanelSortAndSearch(MOCK_DATA);
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
        <Table.ScrollContainer minWidth={800} h={scrollContainerHeight}>
            <SearchBar
                placeholder={translate("pages.adminDashboard.usersPanel.search.placeholder")}
                onSearch={onSearch}
            />

            <Table verticalSpacing="md" stickyHeader highlightOnHover mt="md">
                <UserManagementPanelHeader sortBy={sortBy} onSort={onSort} sortDirection={sortDirection} />
                <Table.Tbody>
                    {data.map((user) => (
                        <UserRow
                            key={user.id}
                            userDetails={user}
                            events={{
                                onDelete: () => onUserDelete(user),
                                onUserRoleChange: () => onUserRoleChangeInternal(user),
                                onUserReservationsPermissionToggle: () => onUserReservationsPermissionToggle(user),
                            }}
                        />
                    ))}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
};
