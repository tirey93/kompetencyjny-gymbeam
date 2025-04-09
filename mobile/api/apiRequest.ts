import { RequestOptions } from "@/api/types";
import { AuthCookieStore } from "@/features/auth/store/AuthCookieStore";

const DEFAULT_REQUEST_OPTIONS: RequestInit = {
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
};

const AUTH_TOKEN_COOKIE = "X-Access-Token";
const USER_ID_COOKIE = "X-User-Id";

export async function apiRequest<T = null>(endpoint: string, requestOptions?: RequestOptions): Promise<T> {
    const requestURL = buildFinalURL(endpoint, requestOptions);
    const options = {
        ...DEFAULT_REQUEST_OPTIONS,
        ...mapRequestOptionsToInitRequest(requestOptions ?? {}),
    };

    await attachAuthCookie(options);
    const response = await fetch(requestURL, options);
    await interceptAuthCookie(response.headers);

    if (response.status < 200 || response.status > 299) {
        throw {
            status: response.status,
        };
    }

    if (response.status === 204) {
        return {} as T; // TODO: Remove this assertion and handle 204 differently
    }

    return response.json();
}

const mapRequestOptionsToInitRequest = (options: RequestOptions): RequestInit => ({
    ...options,
    body: options.body && JSON.stringify(options.body),
});

const buildFinalURL = (endpoint: string, options?: Pick<RequestOptions, "queryParams" | "urlParams">) => {
    const baseUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/${endpoint}`;

    if (!options?.queryParams) {
        return baseUrl;
    }

    const searchParams = new URLSearchParams(JSON.parse(JSON.stringify(options.queryParams)));
    return `${baseUrl}?${searchParams}`;
};

const extractCookieValue = (cookiesHeader: string, key: string) => {
    if (!cookiesHeader) {
        return null;
    }

    for (const cookieString of cookiesHeader.split(",")) {
        const normalizedCookieString = cookieString.trim();

        if (normalizedCookieString.trim().startsWith(`${key}=`)) {
            const valuePart = normalizedCookieString.split(";")[0];
            return valuePart.substring(`${key}=`.length);
        }
    }

    return null;
};

const attachAuthCookie = async (options: RequestInit) => {
    const authCookie = await AuthCookieStore.get();

    if (authCookie) {
        const headers = new Headers(options.headers);
        headers.append("Cookie", authCookie);
        options.headers = headers;
    }
};

const interceptAuthCookie = async (headers: Headers) => {
    const setCookieHeader = headers.get("set-cookie");

    const authToken = setCookieHeader ? extractCookieValue(setCookieHeader, AUTH_TOKEN_COOKIE) : null;
    const userId = setCookieHeader ? extractCookieValue(setCookieHeader, USER_ID_COOKIE) : null;

    if (authToken && userId) {
        await AuthCookieStore.set(`${AUTH_TOKEN_COOKIE}=${authToken};${USER_ID_COOKIE}=${userId};`);
    }
};
