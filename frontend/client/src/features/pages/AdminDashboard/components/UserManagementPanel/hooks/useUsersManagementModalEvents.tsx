import { useCallback } from "react";
import { modals } from "@mantine/modals";

import { UserDetails, UserRole } from "../../../../../../common/auth";

type UseUsersManagementModalEvents = {
    onUserDelete: (user: UserDetails) => void;
    onUserRoleChange: (user: UserDetails, newRole: UserRole) => void;
    onUserReservationsPermissionToggle: (user: UserDetails) => void;
};

export const useUsersManagementModalEvents = (): UseUsersManagementModalEvents => {
    const onUserDelete = useCallback(
        (user: UserDetails) =>
            modals.openContextModal({
                modal: "deleteUser",
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
                innerProps: {
                    user,
                },
            }),
        []
    );

    return { onUserDelete, onUserRoleChange, onUserReservationsPermissionToggle };
};
