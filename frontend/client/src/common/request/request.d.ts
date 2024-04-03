import { UserRole } from "../auth/Auth";

export type ApiResourceName = "SignIn" | "SignUp" | "SignOut" | "CurrentUserDetails" | "ChangeReservationsPermission" | "ChangeRole" | "DeleteUser" | "GetAllUsers";

export type RequestError = {
    status?: number;
    message?: string;
};

export type RequestOptions = Partial<{
    body: object;
    method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
    queryParams: Record<string, string | number | boolean>;
    urlParams: Record<string, string>;
}>;

export type UserDetailsResponse = {
    id: number;
    name: string;
    displayName: string;
    role: UserRole;
    reservationDisabled: boolean;
};

export type SignInRequestBody = { username: string; password: string };

export type SignUpRequestBody = { displayName: string; username: string; password: string };

export type ChangeReservationsPermissionQueryParams = { value: boolean; };
export type ChangeReservationsPermissionURLParams = { userId: string; };

export type ChangeRoleRequestBody = { newRole: Exclude<UserRole, "Guest">; };
export type ChangeRoleURLParams = { userId: string; };

export type DeleteUserURLParams = { userId: string; };
