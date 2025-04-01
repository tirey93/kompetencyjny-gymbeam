import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Button } from "tamagui";
import { toast } from "sonner-native";

import { HttpErrorsMap, mapErrorToErrorMessage } from "@/api";
import { Screens } from "@/constants/Screens";
import { AuthService } from "@/features/auth";

WebBrowser.maybeCompleteAuthSession();

export const GoogleOAuthButton = () => {
    const beginSignInWithGoogle = async () => {
        try {
            const { link } = await AuthService.signInWithGoogle();
            const result = await WebBrowser.openAuthSessionAsync(link);
            if (result.type === "success") {
                router.push(Screens.SignIn);
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
