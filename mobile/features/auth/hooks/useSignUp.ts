import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { AuthService } from "../api/authService";
import { SignUpRequestBody } from "../api/types";
import { useAuthState } from "./useAuthState";

import { HttpErrorsMap, mapErrorToErrorMessage } from "@/api";
import { mapUserDtoToUser } from "@/features/users/utils/mapUserDtoToUser";
import { User } from "@/types/Auth";

type UseSignUp = {
    signUp: (signUpData: SignUpRequestBody) => Promise<User>;
};

export const useSignUp = (): UseSignUp => {
    const { mutateAsync } = useMutation({
        mutationFn: AuthService.signUp,
    });

    const { setUser } = useAuthState();

    const signUp = useCallback(
        async (signUpRequestBody: SignUpRequestBody) => {
            try {
                const data = await mutateAsync(signUpRequestBody);
                const user = mapUserDtoToUser(data);
                setUser(user);
                return user;
            } catch (error) {
                const errorMessage = mapErrorToErrorMessage(error, errorsMap);
                throw new Error(errorMessage);
            }
        },
        [mutateAsync, setUser]
    );

    return { signUp };
};

const errorsMap: HttpErrorsMap = {
    defaultError: "Unknown error.",
    statusCodesMap: {
        409: "This login is already taken.",
    },
};
