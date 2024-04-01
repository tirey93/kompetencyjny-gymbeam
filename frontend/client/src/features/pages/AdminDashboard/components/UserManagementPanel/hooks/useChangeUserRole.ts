import { useCallback, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { UserRole } from "../../../../../../common/auth";
import { useTranslate } from "../../../../../../common/i18n";
import { TranslationKey } from "../../../../../../common/i18n/translations/i18n";
import { request, RequestError } from "../../../../../../common/request";

type UseChangeUserRole = {
    changeRole: (userId: number, newRole: UserRole) => Promise<void>;
    error: string | null;
    reset: () => void;
};

type ChangeUserRoleRequestOptions = {
    queryParams: { role: UserRole };
    urlParams: { userId: string };
};

const changeUserRoleRequest = (options: ChangeUserRoleRequestOptions) => {
    return request("ChangeRole", {
        method: "PUT",
        ...options,
    });
};

export const useChangeUserRole = (): UseChangeUserRole => {
    const translate = useTranslate();
    const [errorTranslationKey, setErrorTranslationKey] = useState<TranslationKey | null>(null);
    const { mutateAsync } = useMutation({
        mutationFn: changeUserRoleRequest,
    });

    const mapErrorToErrorTranslationKey = useCallback((error: unknown): TranslationKey => {
        const errorCode = (error as RequestError)?.status ?? null;

        switch (errorCode) {
            default:
                return "apiErrors.user.changeRole.default";
        }
    }, []);

    const changeRole = useCallback(
        async (userId: number, newRole: UserRole) => {
            const { error } = await mutateAsync({
                queryParams: { role: newRole },
                urlParams: { userId: userId.toString() },
            });

            if (error) {
                const translationKey = mapErrorToErrorTranslationKey(error);
                setErrorTranslationKey(translationKey);
                throw new Error(translate(translationKey));
            }
        },
        [mapErrorToErrorTranslationKey, mutateAsync, translate]
    );

    const error = useMemo(
        () => (errorTranslationKey ? translate(errorTranslationKey) : null),
        [errorTranslationKey, translate]
    );

    const reset = useCallback(() => {
        setErrorTranslationKey(null);
    }, []);

    return { changeRole, error, reset };
};
