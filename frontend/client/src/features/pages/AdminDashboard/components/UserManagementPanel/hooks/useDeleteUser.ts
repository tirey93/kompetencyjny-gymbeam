import { useCallback, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useTranslate } from "../../../../../../common/i18n";
import { TranslationKey } from "../../../../../../common/i18n/translations/i18n";
import { request, RequestError } from "../../../../../../common/request";

type UseDeleteUser = {
    deleteUser: (userId: number) => Promise<void>;
    error: string | null;
    reset: () => void;
};

type DeleteUserRequestOptions = {
    urlParams: { userId: string };
};

const deleteUserRequest = (options: DeleteUserRequestOptions) => {
    return request("DeleteUser", {
        method: "DELETE",
        ...options,
    });
};

export const useDeleteUser = (): UseDeleteUser => {
    const translate = useTranslate();
    const [errorTranslationKey, setErrorTranslationKey] = useState<TranslationKey | null>(null);
    const { mutateAsync } = useMutation({
        mutationFn: deleteUserRequest,
    });

    const mapErrorToErrorTranslationKey = useCallback((error: unknown): TranslationKey => {
        const errorCode = (error as RequestError)?.status ?? null;

        switch (errorCode) {
            default:
                return "apiErrors.user.delete.default";
        }
    }, []);

    const deleteUser = useCallback(
        async (userId: number) => {
            const { error } = await mutateAsync({
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

    return { deleteUser, error, reset };
};
