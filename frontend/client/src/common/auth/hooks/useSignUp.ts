import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAppOverlayStore } from "../../components/AppOverlay";
import { TranslationKey } from "../../i18n/translations/i18n";
import { request, RequestError, SignUpRequestBody } from "../../request";
import { useRequestErrorHandler } from "../../request/hooks/useRequestErrorHandler";
import { UserDetails } from "../Auth";
import { useAuthState } from "./useAuthState";

type UseSignUp = {
    signUp: (signUpData: SignUpRequestBody) => Promise<UserDetails>;
    error: string | null;
    reset: () => void;
};

export const useSignUp = (): UseSignUp => {
    const { setAndTranslateError, error, reset } = useRequestErrorHandler();
    const { mutateAsync } = useMutation({
        mutationFn: signUpRequest,
    });

    const setCurrentUserDetails = useAuthState((state) => state.setCurrentUserDetails);
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);

    const signUp = useCallback(
        async (signUpRequestBody: SignUpRequestBody) => {
            setIsLoading(true);
            const { data, error } = await mutateAsync(signUpRequestBody);
            setIsLoading(false);

            if (!data) {
                throw new Error(setAndTranslateError(mapErrorToErrorTranslationKey(error)));
            }

            setCurrentUserDetails(data);
            return data;
        },
        [mutateAsync, setAndTranslateError, setCurrentUserDetails, setIsLoading]
    );

    return { signUp, error, reset };
};

const signUpRequest = (body: SignUpRequestBody) => {
    return request("SignUp", { body, method: "POST" });
};

const mapErrorToErrorTranslationKey = (error: RequestError | null): TranslationKey => {
    switch (error?.status) {
        case 409:
            return "apiErrors.auth.signUp.loginTaken";

        default:
            return "apiErrors.auth.signUp.default";
    }
};
