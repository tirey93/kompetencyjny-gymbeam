import { useCallback } from "react";
import { modals } from "@mantine/modals";

import { User, UserRole } from "@/types";

type UseUsersManagementModalEvents = {
    onUserDelete: (user: User) => void;
    onUserRoleChange: (user: User, newRole: UserRole) => void;
    onUserReservationsPermissionToggle: (user: User) => void;
    onShowUserReservations: (user: User) => void;
};

export const useUsersManagementModalEvents = (): UseUsersManagementModalEvents => {
    const onUserDelete = useCallback(
        (user: User) =>
            modals.openContextModal({
                modal: "deleteUser",
                withCloseButton: false,
                centered: true,
                innerProps: {
                    user,
                },
            }),
        []
    );

    const onUserRoleChange = useCallback(
        (user: User, newRole: UserRole) =>
            modals.openContextModal({
                modal: "changeUserRole",
                centered: true,
                withCloseButton: false,
                innerProps: {
                    user,
                    newRole,
                },
            }),
        []
    );

    const onUserReservationsPermissionToggle = useCallback(
        (user: User) =>
            modals.openContextModal({
                modal: "toggleUserReservationsPermission",
                centered: true,
                withCloseButton: false,
                innerProps: {
                    user,
                },
            }),
        []
    );

    const onShowUserReservations = useCallback(
        (user: User) =>
            modals.openContextModal({
                modal: "showReservations",
                centered: true,
                withCloseButton: false,
                innerProps: {
                    type: "ReservationsForUser",
                    userId: user.id,
                },
            }),
        []
    );

    return { onUserDelete, onUserRoleChange, onUserReservationsPermissionToggle, onShowUserReservations };
};
