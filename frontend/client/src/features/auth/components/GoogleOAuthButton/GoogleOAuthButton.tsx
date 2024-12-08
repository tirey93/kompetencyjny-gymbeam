import { Button, Image } from "@mantine/core";

import googleLogo from "../../assets/google-logo.svg";

import classes from "./GoogleOAuthButton.module.scss";

import { AuthService } from "@/features/auth";
import { useTranslate } from "@/lib/i18n";

export const GoogleOAuthButton = () => {
    const t = useTranslate();

    const beginSignInWithGoogle = async () => {
        // TODO: Handle API errors, maybe show some notifications after successful login
        const { link } = await AuthService.signInWithGoogle();
        window.location.href = link;
    };

    return (
        <Button
            className={classes.button}
            leftSection={<Image src={googleLogo} className={classes.icon} />}
            onClick={beginSignInWithGoogle}
            variant="default"
        >
            {t("pages.signIn.oAuth.google")}
        </Button>
    );
};
