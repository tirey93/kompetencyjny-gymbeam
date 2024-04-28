import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { QueryKey, useInvalidateQuery } from "../../../apiClient";
import { request } from "../../../request";
import { useRequestErrorHandler } from "../../../request/hooks/useRequestErrorHandler";
import {
    HttpErrorsTranslationsMap,
    mapErrorToErrorTranslationKey,
} from "../../../request/utils/mapErrorToErrorTranslationKey";

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
        ...options,
    });
};

export const useDeleteUser = (): UseDeleteUser => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync } = useMutation({
        mutationFn: deleteUserRequest,
        onSuccess: () => invalidate(QueryKey.Users),
    });

    const deleteUser = useCallback(
        async (userId: number) => {
            try {
                await mutateAsync({
                    urlParams: { userId: userId.toString() },
                });
            } catch (error) {
                const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
                throw new Error(setAndTranslateError(errorTranslation));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { deleteUser, error, reset };
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.user.delete.default",
    statusCodesMap: {},
};
