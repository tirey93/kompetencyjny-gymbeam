export type UserRole = "Admin" | "User";

export type InternalUserRole = UserRole | "Guest";

export type UserDetails = {
    id: number;
    name: string;
    displayName: string;
    role: InternalUserRole;
    reservationDisabled: boolean;
};
