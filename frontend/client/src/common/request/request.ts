/* eslint sonarjs/no-duplicate-string: 0 */
import { ActivityDTO, ActivityInstance, AddActivityDTO } from "../activities/Activities";
import { UserDetails, UserRole } from "../auth";
import { ApiResourceName, RequestOptions, SignInRequestBody, SignUpRequestBody, UserDetailsResponse } from "./";

const { VITE_API_BASE_URL } = import.meta.env;

const AVAILABLE_API_RESOURCES: Record<
    ApiResourceName,
    { endpoint: string; method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH" }
> = {
    SignIn: { endpoint: "Authentication/Login", method: "POST" },
    SignUp: { endpoint: "Authentication/Register", method: "POST" },
    SignOut: { endpoint: "Authentication/Logout", method: "POST" },
    CheckUserNameAvailability: { endpoint: "User/CheckAvailability/ByName/{username}" },
    CurrentUserDetails: { endpoint: "User/LoggedIn" },
    GetAllUsers: { endpoint: "User" },
    DeleteUser: { endpoint: "User/{userId}", method: "DELETE" },
    ChangeRole: { endpoint: "User/{userId}/Role", method: "PUT" },
    ChangeReservationsPermission: { endpoint: "User/{userId}/ReservationDisabled", method: "PUT" },
    GetAllActivities: { endpoint: "Activity" },
    GetActivity: { endpoint: "Activity/{activityId}" },
    AddActivity: { endpoint: "Activity", method: "POST" },
    UpdateActivity: { endpoint: "Activity/{activityId}", method: "PUT" },
    DeleteActivity: { endpoint: "Activity/{activityId}", method: "DELETE" },
    GetActivitiesInstancesByDates: { endpoint: "Enrollment/ByDates" },
    AddReservation: { endpoint: "Reservation", method: "POST" },
    RemoveReservation: { endpoint: "Reservation/{id}", method: "DELETE" },
};

const DEFAULT_REQUEST_OPTIONS: RequestInit = {
    method: "GET",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
};

export async function request(resource: "GetAllActivities"): Promise<ActivityDTO[]>;

export async function request(
    resource: "GetActivity",
    options: { urlParams: { activityId: string } }
): Promise<ActivityDTO>;

export async function request(resource: "AddActivity", options: { body: AddActivityDTO }): Promise<void>;

export async function request(
    resource: "UpdateActivity",
    options: { body: ActivityDTO; urlParams: { activityId: string } }
): Promise<null>;

export async function request(
    resource: "DeleteActivity",
    options: { urlParams: { activityId: string } }
): Promise<null>;

export async function request(resource: "AddReservation"): Promise<void>;

export async function request(resource: "RemoveReservation", options: { urlParams: { id: string } }): Promise<void>;

export async function request(
    resource: "GetActivitiesInstancesByDates",
    options: { queryParams: { from: string; to: string } }
): Promise<ActivityInstance[]>;

export async function request(resource: "GetAllUsers"): Promise<UserDetails[]>;

export async function request(resource: "CurrentUserDetails"): Promise<UserDetailsResponse>;

export async function request(resource: "SignOut"): Promise<null>;

export async function request(
    resource: "CheckUserNameAvailability",
    options: { urlParams: { username: string } }
): Promise<boolean>;

export async function request(resource: "SignIn", options: { body: SignInRequestBody }): Promise<UserDetailsResponse>;

export async function request(resource: "SignUp", options: { body: SignUpRequestBody }): Promise<UserDetailsResponse>;

export async function request(
    resource: "ChangeReservationsPermission",
    options: {
        queryParams: { value: boolean };
        urlParams: { userId: string };
    }
): Promise<null>;

export async function request(
    resource: "ChangeRole",
    options: { body: { newRole: Exclude<UserRole, "Guest"> }; urlParams: { userId: string } }
): Promise<null>;

export async function request(resource: "DeleteUser", options: { urlParams: { userId: string } }): Promise<null>;

export async function request(resource: ApiResourceName, requestOptions?: RequestOptions): Promise<unknown> {
    const { endpoint, ...resourceOptions } = AVAILABLE_API_RESOURCES[resource];
    const requestURL = buildFinalURL(endpoint, requestOptions);

    const response = await fetch(requestURL, {
        ...DEFAULT_REQUEST_OPTIONS,
        ...resourceOptions,
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

const buildFinalURL = (endpoint: string, options?: Pick<RequestOptions, "queryParams" | "urlParams">) => {
    const searchParams = options?.queryParams
        ? new URLSearchParams(JSON.parse(JSON.stringify(options.queryParams)))
        : "";

    let parsedEndpoint = endpoint;
    if (options?.urlParams) {
        for (const [key, value] of Object.entries(options.urlParams)) {
            parsedEndpoint = parsedEndpoint.replace(`{${key}}`, value);
        }
    }

    return `${VITE_API_BASE_URL}/${parsedEndpoint}?${searchParams}`;
};
