import { PropsWithChildren } from "react";
import { ModalsProvider } from "@mantine/modals";

import {
    AddActivityModal,
    DeleteActivityModal,
} from "../../../features/pages/AdminDashboard/components/ActivitiesManagementPanel/components";
import {
    ChangeUserReservationPermissionsModal,
    ChangeUserRoleModal,
    DeleteUserModal,
} from "../../../features/pages/AdminDashboard/components/UserManagementPanel/modals";

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
