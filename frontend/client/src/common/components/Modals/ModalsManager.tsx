import { PropsWithChildren } from "react";
import { ModalsProvider } from "@mantine/modals";

import {
    ActivityDetailsModal,
    AddActivityModal,
    ChangeUserReservationPermissionsModal,
    ChangeUserRoleModal,
    DeleteActivityModal,
    DeleteUserModal,
    ReservationsModal,
} from "./modals";

export const CONTEXT_MODALS = {
    toggleUserReservationsPermission: ChangeUserReservationPermissionsModal,
    changeUserRole: ChangeUserRoleModal,
    deleteUser: DeleteUserModal,
    addActivity: AddActivityModal,
    deleteActivity: DeleteActivityModal,
    activityDetails: ActivityDetailsModal,
    showReservations: ReservationsModal,
};

export const ModalsManager = ({ children }: PropsWithChildren) => {
    return <ModalsProvider modals={CONTEXT_MODALS}>{children}</ModalsProvider>;
};
