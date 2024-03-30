import {
    ApiResourceName,
    RequestOptions,
    RequestResult,
    SignInRequestBody,
    SignUpRequestBody,
    UserDetailsResponse,
} from "./";

const { VITE_API_BASE_URL } = import.meta.env;

const AVAILABLE_API_RESOURCES: Record<ApiResourceName, string> = {
    CurrentUserDetails: "User",
    SignIn: "api/Authentication/Login",
    SignUp: "api/Authentication/Register",
    SignOut: "api/Authentication/Logout",
};

const DEFAULT_REQUEST_OPTIONS: RequestInit = {
    method: "GET",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
};

export async function request(
    resource: "SignIn",
    options: { body: SignInRequestBody; method: "POST" }
): Promise<RequestResult<UserDetailsResponse>>;

export async function request(
    resource: "SignUp",
    options: { body: SignUpRequestBody; method: "POST" }
): Promise<RequestResult<UserDetailsResponse>>;

export async function request(resource: "SignOut", options: { method: "POST" }): Promise<RequestResult<null>>;

export async function request(resource: "CurrentUserDetails"): Promise<RequestResult<UserDetailsResponse>>;

export async function request(
    resource: ApiResourceName,
    requestOptions?: RequestOptions
): Promise<RequestResult<unknown>> {
    const endpoint = AVAILABLE_API_RESOURCES[resource];

    try {
        const response = await fetch(`${VITE_API_BASE_URL}/${endpoint}`, {
            ...DEFAULT_REQUEST_OPTIONS,
            ...mapRequestOptionsToInitRequest(requestOptions ?? {}),
        });
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { error, data: null };
    }
}

const mapRequestOptionsToInitRequest = (options: RequestOptions): RequestInit => ({
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
});
