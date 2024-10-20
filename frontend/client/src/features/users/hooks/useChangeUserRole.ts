import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey, useRequestErrorHandler } from "@/api";
import { UsersService } from "@/features/users";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";
import { UserRole } from "@/types";

type UseChangeUserRole = {
    changeRole: (userId: number, newRole: UserRole) => Promise<void>;
    error: string | null;
    reset: () => void;
    isLoading: boolean;
};

export const useChangeUserRole = (): UseChangeUserRole => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: UsersService.changeUserRole,
        onSuccess: () => invalidate(QueryKey.Users),
    });

    const changeRole = useCallback(
        async (userId: number, role: UserRole) => {
            try {
                await mutateAsync({ id: userId, role });
            } catch (error) {
                const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
                throw new Error(setAndTranslateError(errorTranslation));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { changeRole, reset, error, isLoading: isPending };
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.user.changeRole.default",
    statusCodesMap: {
        404: "apiErrors.user.changeRole.notFound",
    },
};
