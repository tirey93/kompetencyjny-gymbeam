import { useCallback } from "react";
import { toast } from "sonner-native";

import { useAuthState } from "../hooks/useAuthState";

import { HttpErrorsMap, mapErrorToErrorMessage } from "@/api";

type UseSignOut = {
    signOut: () => Promise<void>;
};

export const useSignOut = (): UseSignOut => {
    // const { mutateAsync } = useMutation({
    //     mutationFn: AuthService.signOut,
    // });

    const { clearUser } = useAuthState();

    const signOut = useCallback(async () => {
        try {
            //await mutateAsync();
            clearUser();
            toast.success("See you later!");
        } catch (error) {
            toast.success("Couldn't log you out.");
            const errorMessage = mapErrorToErrorMessage(error, errorsMap);
            throw new Error(errorMessage);
        }
    }, [clearUser]);

    return { signOut };
};

const errorsMap: HttpErrorsMap = {
    defaultError: "Unknown error.",
    statusCodesMap: {},
};
