import { useCallback, useMemo, useState } from "react";

export type SortDirection = "ASC" | "DESC";

export type UseSortByColumns<TData> = {
    onSort: (column: keyof TData) => void;
    sortDirection: SortDirection | null;
    sortBy: keyof TData | null;
    sortedData: TData[];
};

export const useSortByColumns = <TData>(data: TData[]): UseSortByColumns<TData> => {
    const [sortBy, setSortBy] = useState<keyof TData | null>(null);
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC" | null>(null);

    const onSort = useCallback(
        (column: keyof TData) => {
            if (column !== sortBy) {
                setSortBy(column);
                setSortDirection("ASC");
                return;
            }

            switch (sortDirection) {
                case "ASC":
                    return setSortDirection("DESC");
                case "DESC":
                    setSortBy(null);
                    return setSortDirection(null);
                default:
                    return setSortDirection("ASC");
            }
        },
        [sortBy, sortDirection]
    );

    const sortedData = useMemo(() => {
        if (!sortBy || !sortDirection) {
            return data;
        }

        const v = sortDirection === "ASC" ? 1 : -1;
        return [...data].sort((a, b) => (a[sortBy] > b[sortBy] ? v : -v));
    }, [data, sortBy, sortDirection]);

    return { onSort, sortBy, sortDirection, sortedData };
};
