import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { QueryKey, useInvalidateQuery } from "../../apiClient";
import { UserRole } from "../../auth";
import { request } from "../../request";
import { useRequestErrorHandler } from "../../request/hooks/useRequestErrorHandler";
import {
    HttpErrorsTranslationsMap,
    mapErrorToErrorTranslationKey,
} from "../../request/utils/mapErrorToErrorTranslationKey";

type UseChangeUserRole = {
    changeRole: (userId: number, newRole: UserRole) => Promise<void>;
    error: string | null;
    reset: () => void;
    isLoading: boolean;
};

type ChangeUserRoleRequestOptions = {
    body: { newRole: UserRole };
    urlParams: { userId: string };
};

export const useChangeUserRole = (): UseChangeUserRole => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: changeUserRoleRequest,
        onSuccess: () => invalidate(QueryKey.Users),
    });

    const changeRole = useCallback(
        async (userId: number, newRole: UserRole) => {
            try {
                await mutateAsync({
                    body: { newRole: newRole },
                    urlParams: { userId: userId.toString() },
                });
            } catch (error) {
                const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
                throw new Error(setAndTranslateError(errorTranslation));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { changeRole, reset, error, isLoading: isPending };
};

const changeUserRoleRequest = (options: ChangeUserRoleRequestOptions) => {
    return request("ChangeRole", {
        ...options,
    });
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.user.changeRole.default",
    statusCodesMap: {},
};
