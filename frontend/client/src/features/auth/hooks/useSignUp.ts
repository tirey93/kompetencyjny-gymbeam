import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAuthState } from "./useAuthState";

import { request, SignUpRequestBody } from "@/api";
import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
import { useAppOverlayStore } from "@/components/AppOverlay";
import { UserDetails } from "@/types/Auth";

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

    const { setUser } = useAuthState();
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);

    const signUp = useCallback(
        async (signUpRequestBody: SignUpRequestBody) => {
            setIsLoading(true);

            try {
                const data = await mutateAsync(signUpRequestBody);
                setUser(data);
                return data;
            } catch (error) {
                const errorTranslation = mapErrorToErrorTranslationKey(error, errorsMap);
                throw new Error(setAndTranslateError(errorTranslation));
            } finally {
                setIsLoading(false);
            }
        },
        [mutateAsync, setAndTranslateError, setUser, setIsLoading]
    );

    return { signUp, error, reset };
};

const signUpRequest = (body: SignUpRequestBody) => {
    return request("SignUp", { body });
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.auth.signUp.default",
    statusCodesMap: {
        409: "apiErrors.auth.signUp.loginTaken",
    },
};
