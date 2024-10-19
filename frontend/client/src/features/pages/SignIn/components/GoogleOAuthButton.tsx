import { Button, Image } from "@mantine/core";

import { useTranslate } from "../../../../common/i18n";
import GoogleLogo from "../assets/google-logo.svg";

import classes from "./GoogleOAuthButton.module.scss";

export const GoogleOAuthButton = () => {
    const t = useTranslate();

    return (
        <Button
            className={classes.button}
            leftSection={<Image src={GoogleLogo} className={classes.icon} />}
            variant="default"
        >
            {t("pages.signIn.oAuth.google")}
        </Button>
    );
};
