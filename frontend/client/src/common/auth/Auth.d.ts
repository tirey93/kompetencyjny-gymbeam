export type UserRole = "Admin" | "User" | "Guest";

export type UserDetails = {
    login: string;
    name: string;
    role: UserRole;
};
