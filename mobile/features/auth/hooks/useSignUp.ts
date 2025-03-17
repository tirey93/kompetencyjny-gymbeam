import { useCallback } from "react";

import { SignUpRequestBody } from "../api/types";
import { useAuthState } from "./useAuthState";

import { User } from "@/types/Auth";

type UseSignUp = {
    signUp: (signUpData: SignUpRequestBody) => Promise<User>;
};

export const useSignUp = (): UseSignUp => {
    const { setUser } = useAuthState();

    // const { mutateAsync } = useMutation({
    //     mutationFn: AuthService.signUp,
    // });
    //
    // const signUp = useCallback(
    //     async (signUpRequestBody: SignUpRequestBody) => {
    //         try {
    //             const data = await mutateAsync(signUpRequestBody);
    //             const user = mapUserDtoToUser(data);
    //             setUser(user);
    //             return user;
    //         } catch (error) {
    //             const errorMessage = mapErrorToErrorMessage(error, errorsMap);
    //             throw new Error(errorMessage);
    //         }
    //     },
    //     [mutateAsync, setUser]
    // );

    const signUp = useCallback(
        async (signUpRequestBody: SignUpRequestBody) => {
            const user: User = {
                id: 1,
                role: "Admin",
                name: signUpRequestBody.username,
                login: signUpRequestBody.username,
                areReservationsForbidden: false,
                gymPassExpirationTime: null,
            };
            setUser(user);
            return user;
        },
        [setUser]
    );

    return { signUp };
};
//
// const errorsMap: HttpErrorsMap = {
//     defaultError: "Unknown error.",
//     statusCodesMap: {
//         409: "This login is already taken.",
//     },
// };
