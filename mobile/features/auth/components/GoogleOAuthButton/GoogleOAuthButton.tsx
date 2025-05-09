import { router } from "expo-router";
import { Button } from "tamagui";
import { toast } from "sonner-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

import { HttpErrorsMap, mapErrorToErrorMessage } from "@/api";
import { Screens } from "@/constants/Screens";
import { AuthService, useAuthState } from "@/features/auth";
import { useAppOverlay } from "@/hooks/useAppOverlay";
import { UserService } from "@/features/users";
import { mapUserDtoToUser } from "@/features/users/utils/mapUserDtoToUser";
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

        } finally {
            setIsLoading(false);
        }
    };

    const beginSignInWithGoogle = async () => {
        try {
            const { link } = await AuthService.signInWithGoogle();
            const redirectUri = AuthSession.makeRedirectUri();
            const result = await WebBrowser.openAuthSessionAsync(link, redirectUri);

            if (result.type == "success") {
                const url = new URL(result.url);
                const params = new URLSearchParams(url.search);
                const authToken = params.get('authToken');
                const userId = params.get('userId');

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
    defaultError: "Failed to login with google.",
    statusCodesMap: {},
};
