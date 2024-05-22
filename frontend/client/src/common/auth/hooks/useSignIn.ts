import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAppOverlayStore } from "../../components/AppOverlay";
import { request, SignInRequestBody } from "../../request";
import { useRequestErrorHandler } from "../../request/hooks/useRequestErrorHandler";
import {
    HttpErrorsTranslationsMap,
    mapErrorToErrorTranslationKey,
} from "../../request/utils/mapErrorToErrorTranslationKey";
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

const signInRequest = (body: SignInRequestBody) => {
    return request("SignIn", { body });
};

const errorsMap: HttpErrorsTranslationsMap = {
    defaultError: "apiErrors.auth.signIn.default",
    statusCodesMap: {
        400: "apiErrors.auth.signIn.incorrectCredentials",
        404: "apiErrors.auth.signIn.incorrectCredentials",
    },
};
