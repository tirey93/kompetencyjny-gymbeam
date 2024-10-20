import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey, useRequestErrorHandler } from "@/api";
import { UsersService } from "@/features/users";
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
