import {
    ApiResourceName,
    ChangeReservationsPermissionQueryParams,
    ChangeReservationsPermissionURLParams,
    ChangeRoleQueryParams,
    ChangeRoleURLParams,
    DeleteUserURLParams,
    RequestOptions,
    RequestResult,
    SignInRequestBody,
    SignUpRequestBody,
    UserDetailsResponse,
} from "./";

const { VITE_API_BASE_URL } = import.meta.env;

const AVAILABLE_API_RESOURCES: Record<ApiResourceName, string> = {
    CurrentUserDetails: "User/LoggedIn",
    SignIn: "api/Authentication/Login",
    SignUp: "api/Authentication/Register",
    SignOut: "api/Authentication/Logout",
    ChangeReservationsPermission: "/User/User/{userId}/ReservationDisabled",
    ChangeRole: "/User/User/{userId}/Role",
    DeleteUser: "/User/{userId}",
};

const DEFAULT_REQUEST_OPTIONS: RequestInit = {
    method: "GET",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
};

export async function request(resource: "CurrentUserDetails"): Promise<RequestResult<UserDetailsResponse>>;

export async function request(resource: "SignOut", options: { method: "POST" }): Promise<RequestResult<null>>;

export async function request(
    resource: "SignIn",
    options: { body: SignInRequestBody; method: "POST" }
): Promise<RequestResult<UserDetailsResponse>>;

export async function request(
    resource: "SignUp",
    options: { body: SignUpRequestBody; method: "POST" }
): Promise<RequestResult<UserDetailsResponse>>;

export async function request(
    resource: "ChangeReservationsPermission",
    options: {
        method: "PUT";
        queryParams: ChangeReservationsPermissionQueryParams;
        urlParams: ChangeReservationsPermissionURLParams;
    }
): Promise<RequestResult<null>>;

export async function request(
    resource: "ChangeRole",
    options: { method: "PUT"; queryParams: ChangeRoleQueryParams; urlParams: ChangeRoleURLParams }
): Promise<RequestResult<null>>;

export async function request(
    resource: "DeleteUser",
    options: { method: "DELETE"; urlParams: DeleteUserURLParams }
): Promise<RequestResult<null>>;

export async function request(
    resource: ApiResourceName,
    requestOptions?: RequestOptions
): Promise<RequestResult<unknown>> {
    const requestURL = buildFinalURL(resource, requestOptions);

    try {
        const response = await fetch(requestURL, {
            ...DEFAULT_REQUEST_OPTIONS,
            ...mapRequestOptionsToInitRequest(requestOptions ?? {}),
        });

        if (response.status === 204 && response.ok) {
            return { error: null, data: null };
        }

        const result = await response.json();

        if (result.status < 200 || result.status > 299) {
            const error = {
                status: result.status,
                message: result.errors?.toString(),
            };

            return { data: null, error };
        }

        return { data: result, error: null };
    } catch (error) {
        return { error, data: null };
    }
}

const mapRequestOptionsToInitRequest = (options: RequestOptions): RequestInit => ({
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
});

const buildFinalURL = (resource: ApiResourceName, options?: Pick<RequestOptions, "queryParams" | "urlParams">) => {
    let endpoint = AVAILABLE_API_RESOURCES[resource];
    const searchParams = options?.queryParams ? new URLSearchParams(options.queryParams) : "";

    if (options?.urlParams) {
        for (const [key, value] of Object.entries(options.urlParams)) {
            endpoint = endpoint.replace(`{${key}}`, value);
        }
    }

    return `${VITE_API_BASE_URL}/${endpoint}?${searchParams}`;
};
