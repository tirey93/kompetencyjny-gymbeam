import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
import { UsersService } from "@/features/users/api/usersService";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

type UseDeleteUser = {
    deleteUser: (userId: number) => Promise<void>;
    error: string | null;
    reset: () => void;
    isLoading: boolean;
};

export const useDeleteUser = (): UseDeleteUser => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: UsersService.deleteUser,
        onSuccess: () => invalidate(QueryKey.Users),
    });

    const deleteUser = useCallback(
        async (userId: number) => {
            try {
                await mutateAsync(userId);
            } catch (error) {
                const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
                throw new Error(setAndTranslateError(errorTranslation));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { deleteUser, error, reset, isLoading: isPending };
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.user.delete.default",
    statusCodesMap: {
        404: "apiErrors.user.delete.notFound",
    },
};
