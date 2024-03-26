const { VITE_API_BASE_URL } = import.meta.env;

export const request = async <TData = null>(endpoint: string, options?: RequestInit) => {
    const defaultHeaders = {
        "Content-Type": "application/json",
    };
    const mergedOptions = { ...options, headers: { ...defaultHeaders, ...options?.headers } };

    try {
        const response = await fetch(`${VITE_API_BASE_URL}/${endpoint}`, mergedOptions);
        const data: TData = await response.json();
        return { data, error: null };
    } catch (error) {
        return { error, data: null };
    }
};
