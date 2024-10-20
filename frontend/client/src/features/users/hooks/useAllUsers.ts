import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
import { UsersService } from "@/features/users/api/usersService";
import { QueryKey } from "@/lib/apiClient";
import { UserDetails } from "@/types";

type UseAllUsers = {
    users: UserDetails[] | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<unknown>;
};

export const useAllUsers = (): UseAllUsers => {
    const { error, setAndTranslateError } = useRequestErrorHandler();
    const {
        data,
        error: queryError,
        refetch,
        isLoading,
    } = useQuery({
        queryFn: UsersService.getAllUsers,
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
