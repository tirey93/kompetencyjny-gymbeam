import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner-native";

import { HttpErrorsMap, mapErrorToErrorMessage } from "@/api";
import { AuthService } from "@/features/auth/api/authService";
import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { AuthCookieStore } from "@/features/auth/store/AuthCookieStore";

type UseSignOut = {
    signOut: () => Promise<void>;
};

export const useSignOut = (): UseSignOut => {
    const { mutateAsync } = useMutation({
        mutationFn: AuthService.signOut,
    });

    const { clearUser } = useAuthState();

    const signOut = useCallback(async () => {
        try {
            await mutateAsync();
            await AuthCookieStore.clear();
            clearUser();
            toast.success("See you later!");
        } catch (error) {
            toast.error("Couldn't log you out.");
            const errorMessage = mapErrorToErrorMessage(error, errorsMap);
            throw new Error(errorMessage);
        }
    }, [clearUser, mutateAsync]);

    return { signOut };
};

const errorsMap: HttpErrorsMap = {
    defaultError: "Unknown error.",
    statusCodesMap: {},
};
