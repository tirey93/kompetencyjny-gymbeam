import { useCallback } from "react";
import { Container } from "@mantine/core";

import classes from "./UsersDashboardPage.module.scss";

import { ErrorScreen, LoaderOverlay } from "@/components/DataDisplay";
import { useAllUsers, UsersTable, useUsersManagementModalEvents } from "@/features/users";
import { useTranslate } from "@/lib/i18n";
import { User } from "@/types";

export const UsersDashboardPage = () => {
    const translate = useTranslate();
    const { users, error, isLoading, refetch } = useAllUsers();
    const { onUserDelete, onUserRoleChange, onUserReservationsPermissionToggle, onShowUserReservations } =
        useUsersManagementModalEvents();

    const onUserRoleChangeInternal = useCallback(
        (user: User) => {
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
        <Container className={classes.container}>
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
