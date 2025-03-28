import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAuthState } from "./useAuthState";

import { HttpErrorsTranslationsMap, mapErrorToErrorTranslationKey, useRequestErrorHandler } from "@/api";
import { useAppOverlayStore } from "@/components/AppOverlay";
import { AuthService, SignUpRequestBody } from "@/features/auth";
import { mapUserDtoToUser } from "@/features/users/utils/mapUserDtoToUser";
import { User } from "@/types/Auth";

type UseSignUp = {
    signUp: (signUpData: SignUpRequestBody) => Promise<User>;
    error: string | null;
    reset: () => void;
};

export const useSignUp = (): UseSignUp => {
    const { setAndTranslateError, error, reset } = useRequestErrorHandler();
    const { mutateAsync } = useMutation({
        mutationFn: AuthService.signUp,
    });

    const { setUser } = useAuthState();
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);

    const signUp = useCallback(
        async (signUpRequestBody: SignUpRequestBody) => {
            setIsLoading(true);

            try {
                const data = await mutateAsync(signUpRequestBody);
                const user = mapUserDtoToUser(data);
                setUser(user);
                return user;
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

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.auth.signUp.default",
    statusCodesMap: {
        409: "apiErrors.auth.signUp.loginTaken",
    },
};
