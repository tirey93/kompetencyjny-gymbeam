import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { TranslationKey } from "../../../../../../common/i18n/translations/i18n";
import { request, RequestError } from "../../../../../../common/request";
import { useRequestErrorHandler } from "../../../../../../common/request/hooks/useRequestErrorHandler";

type UseChangeUserReservationsPermission = {
    changeReservationsPermission: (userId: number, allowReservations: boolean) => Promise<void>;
    error: string | null;
    reset: () => void;
};

type ChangeReservationsPermissionRequestOptions = {
    queryParams: { value: string };
    urlParams: { userId: string };
};

export const useChangeReservationsPermission = (): UseChangeUserReservationsPermission => {
    const { error, reset, setAndTranslateError } = useRequestErrorHandler();
    const { mutateAsync } = useMutation({
        mutationFn: changeReservationsPermissionRequest,
    });

    const changeReservationsPermission = useCallback(
        async (userId: number, reservationsEnabled: boolean) => {
            const { error } = await mutateAsync({
                queryParams: { value: reservationsEnabled.toString() },
                urlParams: { userId: userId.toString() },
            });

            if (error) {
                throw new Error(setAndTranslateError(mapErrorToErrorTranslationKey(error)));
            }
        },
        [mutateAsync, setAndTranslateError]
    );

    return { changeReservationsPermission, error, reset };
};

const changeReservationsPermissionRequest = (options: ChangeReservationsPermissionRequestOptions) => {
    return request("ChangeReservationsPermission", {
        method: "PUT",
        ...options,
    });
};

const mapErrorToErrorTranslationKey = (error: RequestError | null): TranslationKey => {
    switch (error?.status) {
        default:
            return "apiErrors.user.changeReservationsPermission.default";
    }
};
