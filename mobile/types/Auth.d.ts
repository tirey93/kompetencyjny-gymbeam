export type UserRole = "Admin" | "User";

export type InternalUserRole = UserRole | "Guest";

export type UserDto = {
    id: number;
    name: string;
    displayName: string;
    role: InternalUserRole;
    reservationDisabled: boolean;
    subscriptionExpiresAt: string | null;
    subscriptionIsActive: boolean;
};

export type User = {
    id: number;
    name: string;
    login: string;
    role: InternalUserRole;
    areReservationsForbidden: boolean;
    gymPassExpirationTime: Date | null;
};

export type OIDCInitializedResult = {
    link: string;
};
