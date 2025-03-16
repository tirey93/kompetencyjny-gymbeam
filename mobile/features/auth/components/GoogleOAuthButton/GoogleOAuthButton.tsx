import { Button } from "tamagui";

import { AuthService } from "@/features/auth";

export const GoogleOAuthButton = () => {
    const beginSignInWithGoogle = async () => {
        const { link } = await AuthService.signInWithGoogle();
        window.location.href = link;
    };

    return <Button onPress={beginSignInWithGoogle}>Continue with Google</Button>;
};
