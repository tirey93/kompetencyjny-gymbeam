import { useCallback, useMemo, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

import { useTranslate } from "../../../../../../common/i18n";
import { TranslationKey } from "../../../../../../common/i18n/translations/i18n";
import { request, RequestError } from "../../../../../../common/request";

type UseChangeUserReservationsPermission = {
    changeReservationsPermission: (userId: number, allowReservations: boolean) => Promise<void>;
    error: string | null;
};

type ChangeReservationsPermissionRequestOptions = {
    searchParams: { value: string };
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
                searchParams: { value: reservationsEnabled.toString() },
                urlParams: { userId: userId.toString() },
            });

            if (!error) {
                console.log("success");
                notifications.show({
                    withBorder: true,
                    title: translate("notifications.user.changeReservationsPermission.success.title"),
                    message: translate("notifications.user.changeReservationsPermission.success.description", {
                        id: userId,
                    }),
                    color: "success",
                });
            } else {
                const translationKey = mapErrorToErrorTranslationKey(error);
                notifications.show({
                    withBorder: true,
                    title: translate("notifications.user.changeReservationsPermission.error.title"),
                    message: translate("notifications.user.changeReservationsPermission.error.description", {
                        id: userId,
                    }),
                    color: "danger",
                });
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

    return { changeReservationsPermission, error };
};
