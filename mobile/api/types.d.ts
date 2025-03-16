export type RequestOptions = Partial<{
    body: object;
    method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
    queryParams: Record<string, string | number | boolean>;
    urlParams: Record<string, string>;
}>;
