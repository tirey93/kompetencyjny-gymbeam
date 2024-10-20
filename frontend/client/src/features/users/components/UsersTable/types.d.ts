import { UserDetails } from "@/types";

export type UserManagementEvents = {
    onDelete: (user: UserDetails) => void;
    onUserRoleChange: (user: UserDetails) => void;
    onUserReservationsPermissionToggle: (user: UserDetails) => void;
    onShowReservations: (user: UserDetails) => void;
};
