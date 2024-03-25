import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

import { Routes } from "../../../features/router/Routes";
import { useAppOverlayStore } from "../../components/AppOverlay/hooks/useAppOverlayStore";
import { useAuthState } from "./useAuthState";

type SignUpData = { name: string; login: string; password: string };
type SignInData = { login: string; password: string };

type UseAuthentication = {
    signUp: (signUpData: SignUpData) => Promise<void>;
    signIn: (signInData: SignInData) => Promise<void>;
    signOut: () => Promise<void>;
};

export const useAuthentication = (): UseAuthentication => {
    const clearCurrentUserDetails = useAuthState((state) => state.clearCurrentUserDetails);
    const setCurrentUserDetails = useAuthState((state) => state.setCurrentUserDetails);
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);
    const navigate = useNavigate();

    const signOut = useCallback(async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        clearCurrentUserDetails();
        setIsLoading(false);

        notifications.show({
            title: "You have been signed out.",
            message: "See you later!",
            color: "success",
            withBorder: true,
        });
    }, [clearCurrentUserDetails, setIsLoading]);

    const signIn = useCallback(
        async (_data: SignInData) => {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setCurrentUserDetails({ name: "Mock", login: "MockLogin", role: "Admin" });
            navigate(Routes.ROOT);
            setIsLoading(false);

            notifications.show({
                title: "You are now signed in.",
                message: "Good to see you back!",
                color: "success",
                withBorder: true,
            });
        },
        [navigate, setCurrentUserDetails, setIsLoading]
    );

    const signUp = useCallback(
        async (_data: SignUpData) => {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setCurrentUserDetails({ name: "Mock", login: "MockLogin", role: "Admin" });
            navigate(Routes.ROOT);
            setIsLoading(false);

            notifications.show({
                title: "Account created successfully.",
                message: "Our journey begins!",
                color: "success",
                withBorder: true,
            });
        },
        [navigate, setCurrentUserDetails, setIsLoading]
    );

    return { signOut, signIn, signUp };
};
