import { Activity, ActivityInstance } from "../activities/Activities";
import { UserDetails } from "../auth";
import {
    ApiResourceName,
    ChangeReservationsPermissionQueryParams,
    ChangeReservationsPermissionURLParams,
    ChangeRoleRequestBody,
    ChangeRoleURLParams,
    DeleteUserURLParams,
    GetActivitiesInstancesByDatesQueryParams,
    RequestOptions,
    SignInRequestBody,
    SignUpRequestBody,
    UserDetailsResponse,
} from "./";

const { VITE_API_BASE_URL } = import.meta.env;

const AVAILABLE_API_RESOURCES: Record<ApiResourceName, string> = {
    CurrentUserDetails: "User/LoggedIn",
    SignIn: "Authentication/Login",
    SignUp: "Authentication/Register",
    SignOut: "Authentication/Logout",
    ChangeReservationsPermission: "User/{userId}/ReservationDisabled",
    ChangeRole: "User/{userId}/Role",
    DeleteUser: "User/{userId}",
    GetAllUsers: "User",
    GetAllActivities: "Activity",
    GetActivitiesInstancesByDates: "Enrollment/ByDates",
};

const DEFAULT_REQUEST_OPTIONS: RequestInit = {
    method: "GET",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
};

export async function request(resource: "GetAllActivities"): Promise<Activity[]>;

export async function request(
    resource: "GetActivitiesInstancesByDates",
    options: { queryParams: GetActivitiesInstancesByDatesQueryParams }
): Promise<ActivityInstance[]>;

export async function request(resource: "GetAllUsers"): Promise<UserDetails[]>;

export async function request(resource: "CurrentUserDetails"): Promise<UserDetailsResponse>;

export async function request(resource: "SignOut", options: { method: "POST" }): Promise<null>;

export async function request(
    resource: "SignIn",
    options: { body: SignInRequestBody; method: "POST" }
): Promise<UserDetailsResponse>;

export async function request(
    resource: "SignUp",
    options: { body: SignUpRequestBody; method: "POST" }
): Promise<UserDetailsResponse>;

export async function request(
    resource: "ChangeReservationsPermission",
    options: {
        method: "PUT";
        queryParams: ChangeReservationsPermissionQueryParams;
        urlParams: ChangeReservationsPermissionURLParams;
    }
): Promise<null>;

export async function request(
    resource: "ChangeRole",
    options: { method: "PUT"; body: ChangeRoleRequestBody; urlParams: ChangeRoleURLParams }
): Promise<null>;

export async function request(
    resource: "DeleteUser",
    options: { method: "DELETE"; urlParams: DeleteUserURLParams }
): Promise<null>;

export async function request(resource: ApiResourceName, requestOptions?: RequestOptions): Promise<unknown> {
    const requestURL = buildFinalURL(resource, requestOptions);

    const response = await fetch(requestURL, {
        ...DEFAULT_REQUEST_OPTIONS,
        ...mapRequestOptionsToInitRequest(requestOptions ?? {}),
    });

    if (response.status === 204 && response.ok) {
        return null;
    }

    if (response.status < 200 || response.status > 299) {
        throw {
            status: response.status,
        };
    }

    return response.json();
}

const mapRequestOptionsToInitRequest = (options: RequestOptions): RequestInit => ({
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
});

const buildFinalURL = (resource: ApiResourceName, options?: Pick<RequestOptions, "queryParams" | "urlParams">) => {
    let endpoint = AVAILABLE_API_RESOURCES[resource];
    const searchParams = options?.queryParams
        ? new URLSearchParams(JSON.parse(JSON.stringify(options.queryParams)))
        : "";

    if (options?.urlParams) {
        for (const [key, value] of Object.entries(options.urlParams)) {
            endpoint = endpoint.replace(`{${key}}`, value);
        }
    }

    return `${VITE_API_BASE_URL}/${endpoint}?${searchParams}`;
};
