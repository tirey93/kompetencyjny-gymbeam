import { User } from "@/types";

export type UserManagementEvents = {
    onDelete: (user: User) => void;
    onUserRoleChange: (user: User) => void;
    onUserReservationsPermissionToggle: (user: User) => void;
    onShowReservations: (user: User) => void;
};
