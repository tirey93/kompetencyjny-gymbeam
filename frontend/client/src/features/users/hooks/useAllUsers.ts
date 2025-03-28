import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey, useRequestErrorHandler } from "@/api";
import { UsersService } from "@/features/users";
import { mapUserDtoToUser } from "@/features/users/utils/mapUserDtoToUser";
import { QueryKey } from "@/lib/apiClient";
import { User } from "@/types";

type UseAllUsers = {
    users: User[] | null;
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
        select: (data) => data.map(mapUserDtoToUser),
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
