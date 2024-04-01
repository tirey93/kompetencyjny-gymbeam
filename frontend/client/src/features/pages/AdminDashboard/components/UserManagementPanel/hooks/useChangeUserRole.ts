import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { UserRole } from "../../../../../../common/auth";
import { TranslationKey } from "../../../../../../common/i18n/translations/i18n";
import { request, RequestError } from "../../../../../../common/request";
import { useRequestErrorHandler } from "../../../../../../common/request/hooks/useRequestErrorHandler";

type UseChangeUserRole = {
    changeRole: (userId: number, newRole: UserRole) => Promise<void>;
    error: string | null;
    reset: () => void;
};

type ChangeUserRoleRequestOptions = {
    queryParams: { role: UserRole };
    urlParams: { userId: string };
};

export const useChangeUserRole = (): UseChangeUserRole => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { mutateAsync } = useMutation({
        mutationFn: changeUserRoleRequest,
    });

    const changeRole = useCallback(
        async (userId: number, newRole: UserRole) => {
            const { error } = await mutateAsync({
                queryParams: { role: newRole },
                urlParams: { userId: userId.toString() },
            });

            if (error) {
                throw new Error(setAndTranslateError(mapErrorToErrorTranslationKey(error)));
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

const mapErrorToErrorTranslationKey = (error: RequestError | null): TranslationKey => {
    switch (error?.status) {
        default:
            return "apiErrors.user.changeRole.default";
    }
};
