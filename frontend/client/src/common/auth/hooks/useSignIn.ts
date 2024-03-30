import { useCallback, useMemo, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

import { useAppOverlayStore } from "../../components/AppOverlay/hooks/useAppOverlayStore";
import { useTranslate } from "../../i18n/hooks/useTranslate";
import { TranslationKey } from "../../i18n/translations/i18n";
import { request, RequestError, SignInRequestBody } from "../../request";
import { useAuthState } from "./useAuthState";

type UseSignIn = {
    signIn: (signInData: SignInRequestBody) => Promise<void>;
    error: string | null;
    reset: () => void;
};

const signInRequest = (body: SignInRequestBody) => {
    return request("SignIn", { body, method: "POST" });
};

export const useSignIn = (): UseSignIn => {
    const [errorTranslationKey, setErrorTranslationKey] = useState<TranslationKey | null>(null);
    const { mutateAsync } = useMutation({
        mutationFn: signInRequest,
    });

    const setCurrentUserDetails = useAuthState((state) => state.setCurrentUserDetails);
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);
    const translate = useTranslate();

    const mapErrorToErrorTranslationKey = useCallback(
        (error: unknown): TranslationKey => {
            const errorCode = (error as RequestError)?.status ?? null;

            switch (errorCode) {
                case 403:
                    return "apiErrors.auth.signIn.incorrectCredentials";

                default:
                    return "apiErrors.auth.signIn.default";
            }
        },
        [translate]
    );

    const signIn = useCallback(
        async (signInRequestBody: SignInRequestBody) => {
            setIsLoading(true);
            const { data, error } = await mutateAsync(signInRequestBody);
            setIsLoading(false);

            if (data) {
                setCurrentUserDetails(data);
                notifications.show({
                    title: translate("notifications.auth.signedIn.title"),
                    message: translate("notifications.auth.signedIn.description", { user: data.displayName }),
                    color: "success",
                    withBorder: true,
                });
            } else {
                const errorTranslationKey = mapErrorToErrorTranslationKey(error);
                setErrorTranslationKey(errorTranslationKey);
                throw new Error(translate(errorTranslationKey));
            }
        },
        [mapErrorToErrorTranslationKey, mutateAsync, setCurrentUserDetails, setIsLoading, translate]
    );

    const error = useMemo(
        () => (errorTranslationKey ? translate(errorTranslationKey) : null),
        [errorTranslationKey, translate]
    );

    const reset = useCallback(() => {
        setErrorTranslationKey(null);
    }, []);

    return { signIn, error, reset };
};
