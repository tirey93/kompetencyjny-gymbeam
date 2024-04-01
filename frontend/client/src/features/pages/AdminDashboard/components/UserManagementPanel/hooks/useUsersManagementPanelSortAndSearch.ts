import { useCallback, useMemo, useState } from "react";

import { UserDetails } from "../../../../../../common/auth";
import { UseSortByColumns, useSortByColumns } from "../../../../../../common/hooks";

export type UseUsersManagementPanelSortAndSearch = Omit<UseSortByColumns<UserDetails>, "sortedData"> & {
    onSearch: (phrase: string) => void;
    data: UserDetails[];
};

export const useUsersManagementPanelSortAndSearch = (
    dataToProcess: UserDetails[]
): UseUsersManagementPanelSortAndSearch => {
    const { sortedData, sortDirection, sortBy, onSort } = useSortByColumns<UserDetails>(dataToProcess);
    const [searchedPhrase, setSearchedPhrase] = useState("");

    const onSearch = useCallback((phrase: string) => {
        setSearchedPhrase(phrase);
    }, []);

    const data = useMemo(() => {
        if (!searchedPhrase) {
            return sortedData;
        }

        return [...sortedData].filter(({ name, displayName }) =>
            [name, displayName].some((value) => value.toLowerCase().includes(searchedPhrase.toLowerCase()))
        );
    }, [searchedPhrase, sortedData]);

    return { onSearch, onSort, sortBy, sortDirection, data };
};
