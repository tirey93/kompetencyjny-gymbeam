import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { SignInRequestBody } from "../api/types";
import { useAuthState } from "./useAuthState";

import { HttpErrorsMap, mapErrorToErrorMessage } from "@/api";
import { AuthService } from "@/features/auth";
import { mapUserDtoToUser } from "@/features/users/utils/mapUserDtoToUser";

export const useSignIn = () => {
    const { setUser } = useAuthState();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: AuthService.signIn,
    });

    const signIn = useCallback(
        async (signInRequestBody: SignInRequestBody) => {
            try {
                const data = await mutateAsync(signInRequestBody);
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

    return { signIn, isPending };
};

const errorsMap: HttpErrorsMap = {
    defaultError: "Unknown error.",
    statusCodesMap: {
        400: "Incorrect login or password.",
        404: "Incorrect login or password.",
    },
};
