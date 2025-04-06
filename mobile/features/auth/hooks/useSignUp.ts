import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { SignUpRequestBody } from "../api/types";
import { useAuthState } from "./useAuthState";

import { HttpErrorsMap, mapErrorToErrorMessage } from "@/api";
import { AuthService } from "@/features/auth/api/authService";
import { mapUserDtoToUser } from "@/features/users/utils/mapUserDtoToUser";

export const useSignUp = () => {
    const { setUser } = useAuthState();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: AuthService.signUp,
    });

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

    return { signUp, isPending };
};

const errorsMap: HttpErrorsMap = {
    defaultError: "Unknown error.",
    statusCodesMap: {
        409: "This login is already taken.",
    },
};
