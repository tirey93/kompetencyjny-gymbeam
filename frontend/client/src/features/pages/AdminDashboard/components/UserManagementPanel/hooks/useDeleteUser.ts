import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { TranslationKey } from "../../../../../../common/i18n/translations/i18n";
import { request, RequestError } from "../../../../../../common/request";
import { useRequestErrorHandler } from "../../../../../../common/request/hooks/useRequestErrorHandler";

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
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { mutateAsync } = useMutation({
        mutationFn: deleteUserRequest,
    });

    const deleteUser = useCallback(
        async (userId: number) => {
            const { error } = await mutateAsync({
                urlParams: { userId: userId.toString() },
            });

            if (error) {
                throw new Error(setAndTranslateError(mapErrorToErrorTranslationKey(error)));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { deleteUser, error, reset };
};

const mapErrorToErrorTranslationKey = (error: RequestError | null): TranslationKey => {
    switch (error?.status) {
        default:
            return "apiErrors.user.delete.default";
    }
};
