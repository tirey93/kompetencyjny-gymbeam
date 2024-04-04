import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

export enum QueryKey {
    Users,
}

export const useInvalidateQuery = () => {
    const client = useQueryClient();

    const invalidate = useCallback(
        async (queryKey: QueryKey) => {
            return await client.invalidateQueries({ queryKey: [queryKey] });
        },
        [client]
    );

    return { invalidate };
};
