import * as WebBrowser from "expo-web-browser";
import { Button } from "tamagui";

import { AuthService } from "@/features/auth";

WebBrowser.maybeCompleteAuthSession();

export const GoogleOAuthButton = () => {
    const beginSignInWithGoogle = async () => {
        const { link } = await AuthService.signInWithGoogle();
        await WebBrowser.openAuthSessionAsync(link);
    };

    return <Button onPress={beginSignInWithGoogle}>Continue with Google</Button>;
};
