export type UserRole = "Admin" | "User" | "Guest";

export type UserDetails = {
    id: number;
    name: string;
    displayName: string;
    role: UserRole;
    reservationDisabled: boolean;
};
