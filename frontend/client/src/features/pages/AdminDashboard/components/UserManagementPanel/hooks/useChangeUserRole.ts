import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { QueryKey, useInvalidateQuery } from "../../../../../../common/apiClient";
import { UserRole } from "../../../../../../common/auth";
import { request } from "../../../../../../common/request";
import { useRequestErrorHandler } from "../../../../../../common/request/hooks/useRequestErrorHandler";
import {
    HttpErrorsTranslationsMap,
    mapErrorToErrorTranslationKey,
} from "../../../../../../common/request/utils/mapErrorToErrorTranslationKey";

type UseChangeUserRole = {
    changeRole: (userId: number, newRole: UserRole) => Promise<void>;
    error: string | null;
    reset: () => void;
};

type ChangeUserRoleRequestOptions = {
    body: { newRole: UserRole };
    urlParams: { userId: string };
};

export const useChangeUserRole = (): UseChangeUserRole => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync } = useMutation({
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

    return { changeRole, reset, error };
};

const changeUserRoleRequest = (options: ChangeUserRoleRequestOptions) => {
    return request("ChangeRole", {
        method: "PUT",
        ...options,
    });
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.user.changeRole.default",
    statusCodesMap: {},
};
