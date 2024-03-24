import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

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
        console.log("mock sign out");
        setIsLoading(false);
    }, [clearCurrentUserDetails, setIsLoading]);

    const signIn = useCallback(
        async (data: SignInData) => {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setCurrentUserDetails({ name: "Mock", login: "MockLogin", role: "Admin" });
            console.log("mock sign in", data);
            navigate(Routes.ROOT);
            setIsLoading(false);
        },
        [navigate, setCurrentUserDetails, setIsLoading]
    );

    const signUp = useCallback(
        async (data: SignUpData) => {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setCurrentUserDetails({ name: "Mock", login: "MockLogin", role: "Admin" });
            console.log("mock sign up", data);
            navigate(Routes.ROOT);
            setIsLoading(false);
        },
        [navigate, setCurrentUserDetails, setIsLoading]
    );

    return { signOut, signIn, signUp };
};