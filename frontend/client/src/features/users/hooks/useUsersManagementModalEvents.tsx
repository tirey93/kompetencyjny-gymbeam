import { useCallback } from "react";
import { modals } from "@mantine/modals";

import { UserDetails, UserRole } from "@/types";

type UseUsersManagementModalEvents = {
    onUserDelete: (user: UserDetails) => void;
    onUserRoleChange: (user: UserDetails, newRole: UserRole) => void;
    onUserReservationsPermissionToggle: (user: UserDetails) => void;
    onShowUserReservations: (user: UserDetails) => void;
};

export const useUsersManagementModalEvents = (): UseUsersManagementModalEvents => {
    const onUserDelete = useCallback(
        (user: UserDetails) =>
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
        (user: UserDetails, newRole: UserRole) =>
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
        (user: UserDetails) =>
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
        (user: UserDetails) =>
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
