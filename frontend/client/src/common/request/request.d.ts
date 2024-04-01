import { UserRole } from "../auth/Auth";

export type ApiResourceName = "SignIn" | "SignUp" | "SignOut" | "CurrentUserDetails";

export type RequestResult<TData> = {
    data: TData | null;
    error: unknown | null;
};

export type RequestError = {
    status?: number;
};

export type RequestOptions = Partial<{
    body: object;
    method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
}>;

export type UserDetailsResponse = {
    id: number;
    name: string;
    displayName: string;
    role: UserRole;
    reservationDisabled: boolean;
};

export type SignInRequestBody = { username: string; password: string };

export type SignUpRequestBody = { displayName: string; name: string; password: string };
