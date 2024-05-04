import { PropsWithChildren } from "react";
import { ModalsProvider } from "@mantine/modals";

import {
    AddActivityModal,
    ChangeUserReservationPermissionsModal,
    ChangeUserRoleModal,
    DeleteActivityModal,
    DeleteUserModal,
} from "./modals";

export const CONTEXT_MODALS = {
    toggleUserReservationsPermission: ChangeUserReservationPermissionsModal,
    changeUserRole: ChangeUserRoleModal,
    deleteUser: DeleteUserModal,
    addActivity: AddActivityModal,
    deleteActivity: DeleteActivityModal,
};

export const ModalsManager = ({ children }: PropsWithChildren) => {
    return <ModalsProvider modals={CONTEXT_MODALS}>{children}</ModalsProvider>;
};
