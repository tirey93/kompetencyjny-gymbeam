import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAuthState } from "./useAuthState";

import { useRequestErrorHandler } from "@/api/hooks/useRequestErrorHandler";
import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey } from "@/api/utils/mapErrorToErrorTranslationKey";
import { useAppOverlayStore } from "@/components/AppOverlay";
import { AuthService, SignInRequestBody } from "@/features/auth/api/authService";
import { UserDetails } from "@/types/Auth";

type UseSignIn = {
    signIn: (signInData: SignInRequestBody) => Promise<UserDetails>;
    error: string | null;
    reset: () => void;
};

export const useSignIn = (): UseSignIn => {
    const { setAndTranslateError, error, reset } = useRequestErrorHandler();
    const { mutateAsync } = useMutation({
        mutationFn: AuthService.signIn,
    });

    const { setUser } = useAuthState();
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);

    const signIn = useCallback(
        async (signInRequestBody: SignInRequestBody) => {
            setIsLoading(true);

            try {
                const data = await mutateAsync(signInRequestBody);
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

    return { signIn, error, reset };
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.auth.signIn.default",
    statusCodesMap: {
        400: "apiErrors.auth.signIn.incorrectCredentials",
        404: "apiErrors.auth.signIn.incorrectCredentials",
    },
};
