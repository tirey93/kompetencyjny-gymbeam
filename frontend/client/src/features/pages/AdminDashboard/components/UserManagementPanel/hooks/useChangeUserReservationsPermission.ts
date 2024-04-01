import { useCallback, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useTranslate } from "../../../../../../common/i18n";
import { TranslationKey } from "../../../../../../common/i18n/translations/i18n";
import { request, RequestError } from "../../../../../../common/request";

type UseChangeUserReservationsPermission = {
    changeReservationsPermission: (userId: number, allowReservations: boolean) => Promise<void>;
    error: string | null;
    reset: () => void;
};

type ChangeReservationsPermissionRequestOptions = {
    queryParams: { value: string };
    urlParams: { userId: string };
};

const changeReservationsPermissionRequest = (options: ChangeReservationsPermissionRequestOptions) => {
    return request("ChangeReservationsPermission", {
        method: "PUT",
        ...options,
    });
};

export const useChangeReservationsPermission = (): UseChangeUserReservationsPermission => {
    const translate = useTranslate();
    const [errorTranslationKey, setErrorTranslationKey] = useState<TranslationKey | null>(null);
    const { mutateAsync } = useMutation({
        mutationFn: changeReservationsPermissionRequest,
    });

    const mapErrorToErrorTranslationKey = useCallback((error: unknown): TranslationKey => {
        const errorCode = (error as RequestError)?.status ?? null;

        switch (errorCode) {
            default:
                return "apiErrors.user.changeReservationsPermission.default";
        }
    }, []);

    const changeReservationsPermission = useCallback(
        async (userId: number, reservationsEnabled: boolean) => {
            const { error } = await mutateAsync({
                queryParams: { value: reservationsEnabled.toString() },
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

    return { changeReservationsPermission, error, reset };
};
