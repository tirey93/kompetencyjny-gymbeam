import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { request } from "@/api";
import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
import { QueryKey } from "@/lib/apiClient";
import { UserDetails } from "@/types";

type UseAllUsers = {
    users: UserDetails[] | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<unknown>;
};

const getAllUsersRequest = () => {
    return request("GetAllUsers");
};

export const useAllUsers = (): UseAllUsers => {
    const { error, setAndTranslateError } = useRequestErrorHandler();
    const {
        data,
        error: queryError,
        refetch,
        isLoading,
    } = useQuery({
        queryFn: getAllUsersRequest,
        queryKey: [QueryKey.Users],
    });

    useEffect(() => {
        if (queryError) {
            setAndTranslateError(mapErrorToErrorTranslationKey(queryError, errorsMap));
        }
    }, [queryError, setAndTranslateError]);

    return { users: data ?? null, error, isLoading, refetch };
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.user.getAll.default",
    statusCodesMap: {},
};
