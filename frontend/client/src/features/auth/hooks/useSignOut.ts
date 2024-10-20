import { useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
import { useAppOverlayStore } from "@/components/AppOverlay";
import { useAuthState } from "@/features/auth";
import { AuthService } from "@/features/auth/api/authService";
import { useTranslate } from "@/lib/i18n";

type UseSignOut = {
    signOut: () => Promise<void>;
};

export const useSignOut = (): UseSignOut => {
    const { setAndTranslateError } = useRequestErrorHandler();
    const { mutateAsync } = useMutation({
        mutationFn: AuthService.signOut,
    });

    const { clearUser } = useAuthState();
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);
    const translate = useTranslate();

    const signOut = useCallback(async () => {
        setIsLoading(true);

        try {
            await mutateAsync();
            clearUser();
            notifications.show({
                title: translate("notifications.auth.signedOut.title"),
                message: translate("notifications.auth.signedOut.description"),
                color: "success",
                withBorder: true,
            });
        } catch (error) {
            notifications.show({
                title: translate("notifications.auth.signingOutFailed.title"),
                message: translate("notifications.auth.signingOutFailed.description"),
                color: "danger",
                withBorder: true,
            });

            const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
            throw new Error(setAndTranslateError(errorTranslation));
        } finally {
            setIsLoading(false);
        }
    }, [clearUser, mutateAsync, setAndTranslateError, setIsLoading, translate]);

    return { signOut };
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.auth.signOut.default",
    statusCodesMap: {},
};
