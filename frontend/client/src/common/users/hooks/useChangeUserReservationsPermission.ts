import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { QueryKey, useInvalidateQuery } from "../../apiClient";
import { request } from "../../request";
import { useRequestErrorHandler } from "../../request/hooks/useRequestErrorHandler";
import {
    HttpErrorsTranslationsMap,
    mapErrorToErrorTranslationKey,
} from "../../request/utils/mapErrorToErrorTranslationKey";

type UseChangeUserReservationsPermission = {
    changeReservationsPermission: (userId: number, allowReservations: boolean) => Promise<void>;
    error: string | null;
    reset: () => void;
    isLoading: boolean;
};

type ChangeReservationsPermissionRequestOptions = {
    queryParams: { value: boolean };
    urlParams: { userId: string };
};

export const useChangeReservationsPermission = (): UseChangeUserReservationsPermission => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { invalidate } = useInvalidateQuery();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: changeReservationsPermissionRequest,
        onSuccess: () => invalidate(QueryKey.Users),
    });

    const changeReservationsPermission = useCallback(
        async (userId: number, reservationsEnabled: boolean) => {
            try {
                await mutateAsync({
                    queryParams: { value: reservationsEnabled },
                    urlParams: { userId: userId.toString() },
                });
            } catch (error) {
                const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
                throw new Error(setAndTranslateError(errorTranslation));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { changeReservationsPermission, error, reset, isLoading: isPending };
};

const changeReservationsPermissionRequest = (options: ChangeReservationsPermissionRequestOptions) => {
    return request("ChangeReservationsPermission", {
        ...options,
    });
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.user.changeReservationsPermission.default",
    statusCodesMap: {},
};
