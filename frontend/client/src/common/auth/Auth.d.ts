export type UserRole = "Admin" | "User" | "Guest";

export type UserDetails = {
    name: string;
    displayName: string;
    role: UserRole;
};
