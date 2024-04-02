import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAppOverlayStore } from "../../components/AppOverlay";
import { TranslationKey } from "../../i18n/translations/i18n";
import { request, RequestError, SignInRequestBody } from "../../request";
import { useRequestErrorHandler } from "../../request/hooks/useRequestErrorHandler";
import { UserDetails } from "../Auth";
import { useAuthState } from "./useAuthState";

type UseSignIn = {
    signIn: (signInData: SignInRequestBody) => Promise<UserDetails>;
    error: string | null;
    reset: () => void;
};

export const useSignIn = (): UseSignIn => {
    const { setAndTranslateError, error, reset } = useRequestErrorHandler();
    const { mutateAsync } = useMutation({
        mutationFn: signInRequest,
    });

    const { setUser } = useAuthState();
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);

    const signIn = useCallback(
        async (signInRequestBody: SignInRequestBody) => {
            setIsLoading(true);
            const { error, data } = await mutateAsync(signInRequestBody);
            setIsLoading(false);

            if (!data) {
                throw new Error(setAndTranslateError(mapErrorToErrorTranslationKey(error)));
            }

            setUser(data);
            return data;
        },
        [mutateAsync, setAndTranslateError, setUser, setIsLoading]
    );

    return { signIn, error, reset };
};

const signInRequest = (body: SignInRequestBody) => {
    return request("SignIn", { body, method: "POST" });
};

const mapErrorToErrorTranslationKey = (error: RequestError | null): TranslationKey => {
    switch (error?.status) {
        case 400:
        case 403:
            return "apiErrors.auth.signIn.incorrectCredentials";

        default:
            return "apiErrors.auth.signIn.default";
    }
};
