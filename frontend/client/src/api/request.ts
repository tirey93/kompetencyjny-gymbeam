/* eslint sonarjs/no-duplicate-string: 0 */
import { RequestOptions } from "@/api/types";

const { VITE_API_BASE_URL } = import.meta.env;

const DEFAULT_REQUEST_OPTIONS: RequestInit = {
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
};

export async function request<T = null>(endpoint: string, requestOptions?: RequestOptions): Promise<T> {
    const requestURL = buildFinalURL(endpoint, requestOptions);

    const response = await fetch(requestURL, {
        ...DEFAULT_REQUEST_OPTIONS,
        ...mapRequestOptionsToInitRequest(requestOptions ?? {}),
    });

    if (response.status < 200 || response.status > 299) {
        throw {
            status: response.status,
        };
    }

    return response.json();
}

const mapRequestOptionsToInitRequest = (options: RequestOptions): RequestInit => ({
    ...options,
    body: options.body && JSON.stringify(options.body),
});

const buildFinalURL = (endpoint: string, options?: Pick<RequestOptions, "queryParams" | "urlParams">) => {
    const searchParams = options?.queryParams
        ? new URLSearchParams(JSON.parse(JSON.stringify(options.queryParams)))
        : "";

    return `${VITE_API_BASE_URL}/${endpoint}?${searchParams}`;
};
