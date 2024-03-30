import { useCallback, useMemo, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

import { useAppOverlayStore } from "../../components/AppOverlay/hooks/useAppOverlayStore";
import { useTranslate } from "../../i18n/hooks/useTranslate";
import { TranslationKey } from "../../i18n/translations/i18n";
import { request, RequestError, SignUpRequestBody } from "../../request";
import { useAuthState } from "./useAuthState";

type UseSignUp = {
    signUp: (signUpData: SignUpRequestBody) => Promise<void>;
    error: string | null;
    reset: () => void;
};

const signUpRequest = (body: SignUpRequestBody) => {
    return request("SignUp", { body, method: "POST" });
};

export const useSignUp = (): UseSignUp => {
    const [errorTranslationKey, setErrorTranslationKey] = useState<TranslationKey | null>(null);
    const { mutateAsync } = useMutation({
        mutationFn: signUpRequest,
    });

    const setCurrentUserDetails = useAuthState((state) => state.setCurrentUserDetails);
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);
    const translate = useTranslate();

    const mapErrorToErrorTranslationKey = useCallback((error: unknown): TranslationKey => {
        const errorCode = (error as RequestError)?.status ?? null;

        switch (errorCode) {
            case 409:
                return "apiErrors.auth.signUp.loginTaken";

            default:
                return "apiErrors.auth.signUp.default";
        }
    }, []);

    const signUp = useCallback(
        async (signUpRequestBody: SignUpRequestBody) => {
            setIsLoading(true);
            const { data, error } = await mutateAsync(signUpRequestBody);
            setIsLoading(false);

            if (data) {
                setCurrentUserDetails(data);
                notifications.show({
                    title: translate("notifications.auth.signedUp.title"),
                    message: translate("notifications.auth.signedUp.description"),
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

    return { signUp, error, reset };
};
