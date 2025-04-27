import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Button } from "tamagui";
import { toast } from "sonner-native";
import * as Linking from 'expo-linking';

import { HttpErrorsMap, mapErrorToErrorMessage } from "@/api";
import { Screens } from "@/constants/Screens";
import { AuthService, useAuthState, useSignIn } from "@/features/auth";
import * as AuthSession from "expo-auth-session";
import { string } from "yup";
import { useEffect } from "react";
import { useAppOverlay } from "@/hooks/useAppOverlay";
import { UserService } from "@/features/users";
import { mapUserDtoToUser } from "@/features/users/utils/mapUserDtoToUser";
import { useReloadUser } from "@/features/users/hooks/useReloadUser";
import { setAuthCookie } from "@/api/apiRequest";

WebBrowser.maybeCompleteAuthSession();
  
export const GoogleOAuthButton = () => {
    const { setUser, user } = useAuthState();
    const setIsLoading = useAppOverlay((state) => state.setIsLoading);

    const loadUserDetails = async () => {
        setIsLoading(true);
        try {
            const data = await UserService.getMyself();
            if (data) {
                setUser(mapUserDtoToUser(data));
            }
        } catch (error) {
            const message = (error as Error)?.message ?? "";
            console.log(message)
        } finally {
            setIsLoading(false);
        }
    };

    const beginSignInWithGoogle = async () => {
        try {
            const { link } = await AuthService.signInWithGoogle();
            const redirectUri = AuthSession.makeRedirectUri();

            console.log(redirectUri)
            
            
            const result = await WebBrowser.openAuthSessionAsync(link, redirectUri);
            if (result.type == "success") {
                const url = new URL(result.url);
                const params = new URLSearchParams(url.search);
                const authToken = params.get('authToken');
                const userId = params.get('userId');
                // const uset = 
                console.log("authToken")
                console.log(authToken);
            
                console.log("userId")
                console.log(userId);

                if (authToken && userId) {
                    setAuthCookie(authToken, userId);
                }
                loadUserDetails()
                router.replace(Screens.GymPass);
            }
        } catch (error) {
            const errorMessage = mapErrorToErrorMessage(error, errorsMap);
            toast.error(errorMessage);
        }
    };

    return (
        <Button onPress={beginSignInWithGoogle}>Continue with Google</Button>
    );
};

const errorsMap: HttpErrorsMap = {
    defaultError: "Unknown error.",
    statusCodesMap: {},
};
