import { useCallback, useMemo, useState } from "react";

import { UseSortByColumns, useSortByColumns } from "./useSortByColumns";

export type UseSearchAndSort<TData> = Omit<UseSortByColumns<TData>, "sortedData"> & {
    onSearch: (phrase: string) => void;
    data: TData[];
};

type UseSearchAndSortDataOptions<TData> = {
    predicates: (keyof TData)[];
    dataToProcess: TData[];
};

export const useSearchAndSort = <TData>({
    dataToProcess,
    predicates,
}: UseSearchAndSortDataOptions<TData>): UseSearchAndSort<TData> => {
    const { sortedData, sortDirection, sortBy, onSort } = useSortByColumns<TData>(dataToProcess);
    const [searchedPhrase, setSearchedPhrase] = useState("");

    const onSearch = useCallback((phrase: string) => {
        setSearchedPhrase(phrase);
    }, []);

    const data = useMemo(() => {
        if (!searchedPhrase) {
            return sortedData;
        }

        return [...sortedData].filter((item) => {
            const values = predicates.map((predicate) => JSON.stringify(item[predicate]));
            return values.some((value) => value.toLowerCase().includes(searchedPhrase.toLowerCase()));
        });
    }, [predicates, searchedPhrase, sortedData]);

    return { onSearch, onSort, sortBy, sortDirection, data };
};
