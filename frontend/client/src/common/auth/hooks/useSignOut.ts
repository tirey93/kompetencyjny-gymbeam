import { useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

import { useAppOverlayStore } from "../../components/AppOverlay";
import { useTranslate } from "../../i18n";
import { TranslationKey } from "../../i18n/translations/i18n";
import { request, RequestError } from "../../request";
import { useRequestErrorHandler } from "../../request/hooks/useRequestErrorHandler";
import { useAuthState } from "./useAuthState";

type UseSignOut = {
    signOut: () => Promise<void>;
};

export const useSignOut = (): UseSignOut => {
    const { setAndTranslateError } = useRequestErrorHandler();
    const { mutateAsync } = useMutation({
        mutationFn: signOutRequest,
    });

    const { clearUser } = useAuthState();
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);
    const translate = useTranslate();

    const signOut = useCallback(async () => {
        setIsLoading(true);
        const { error } = await mutateAsync();
        setIsLoading(false);

        if (error) {
            notifications.show({
                title: translate("notifications.auth.signingOutFailed.title"),
                message: translate("notifications.auth.signingOutFailed.description"),
                color: "danger",
                withBorder: true,
            });

            throw new Error(setAndTranslateError(mapErrorToErrorTranslationKey(error)));
        } else {
            clearUser();
            notifications.show({
                title: translate("notifications.auth.signedOut.title"),
                message: translate("notifications.auth.signedOut.description"),
                color: "success",
                withBorder: true,
            });
        }
    }, [clearUser, mutateAsync, setAndTranslateError, setIsLoading, translate]);

    return { signOut };
};

const signOutRequest = () => {
    return request("SignOut", { method: "POST" });
};

const mapErrorToErrorTranslationKey = (error: RequestError | null): TranslationKey => {
    switch (error?.status) {
        default:
            return "apiErrors.auth.signOut.default";
    }
};
