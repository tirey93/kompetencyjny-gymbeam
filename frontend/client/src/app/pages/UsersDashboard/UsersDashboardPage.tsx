import { useCallback } from "react";
import { Container } from "@mantine/core";

import { ErrorScreen, LoaderOverlay } from "@/components/DataDisplay";
import { useAllUsers, useUsersManagementModalEvents } from "@/features/users";
import { UsersTable } from "@/features/users/components";
import { useTranslate } from "@/lib/i18n";
import { UserDetails } from "@/types";

export const UsersDashboardPage = () => {
    const translate = useTranslate();
    const { users, error, isLoading, refetch } = useAllUsers();
    const { onUserDelete, onUserRoleChange, onUserReservationsPermissionToggle, onShowUserReservations } =
        useUsersManagementModalEvents();

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
            <UsersTable
                users={users ?? []}
                events={{
                    onDelete: onUserDelete,
                    onShowReservations: onShowUserReservations,
                    onUserReservationsPermissionToggle: onUserReservationsPermissionToggle,
                    onUserRoleChange: onUserRoleChangeInternal,
                }}
            />
        </Container>
    );
};
