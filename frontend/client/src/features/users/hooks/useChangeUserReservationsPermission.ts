import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
import { UsersService } from "@/features/users/api/usersService";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

type UseChangeUserReservationsPermission = {
    changeReservationsPermission: (userId: number, allowReservations: boolean) => Promise<void>;
    error: string | null;
    reset: () => void;
    isLoading: boolean;
};

export const useChangeReservationsPermission = (): UseChangeUserReservationsPermission => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: UsersService.changeUserReservationsPermission,
        onSuccess: () => invalidate(QueryKey.Users),
    });

    const changeReservationsPermission = useCallback(
        async (userId: number, permission: boolean) => {
            try {
                await mutateAsync({ id: userId, permission });
            } catch (error) {
                const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
                throw new Error(setAndTranslateError(errorTranslation));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { changeReservationsPermission, error, reset, isLoading: isPending };
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.user.changeReservationsPermission.default",
    statusCodesMap: {
        404: "apiErrors.user.changeReservationsPermission.notFound",
    },
};
