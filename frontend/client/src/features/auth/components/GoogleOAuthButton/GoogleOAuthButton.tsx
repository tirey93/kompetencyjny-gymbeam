import { Button, Image } from "@mantine/core";

import googleLogo from "../../assets/google-logo.svg";

import classes from "./GoogleOAuthButton.module.scss";

import { useTranslate } from "@/lib/i18n";

export const GoogleOAuthButton = () => {
    const t = useTranslate();

    return (
        <Button
            className={classes.button}
            leftSection={<Image src={googleLogo} className={classes.icon} />}
            variant="default"
        >
            {t("pages.signIn.oAuth.google")}
        </Button>
    );
};
