import { Button, CloseButton, Group, Paper, Text } from "@mantine/core";

import { useTranslate } from "../../i18n";

import classes from "./CookiesPopup.module.scss";

type CookiesPopupProps = {
    onAccept: () => void;
    onClose: () => void;
};

// TODO: Handle button clicks
export const CookiesPopup = ({ onAccept, onClose }: CookiesPopupProps) => {
    const t = useTranslate();

    return (
        <Paper withBorder className={classes.cookiesPopup}>
            <Group className={classes.header}>
                <Text className={classes.title}>{t("common.cookies.popup.title")}</Text>
                <CloseButton className={classes.closeButton} onClick={onClose} />
            </Group>
            <Text className={classes.caption}>
                {t("common.cookies.popup.body")}
            </Text>
            <Group className={classes.footer}>
                <Button variant="subtle" color="info" size="xs">
                    {t("common.cookies.popup.seeTermsAndConditionsButtonLabel")}
                </Button>
                <Button color="success" size="xs" onClick={onAccept}>
                    {t("common.cookies.popup.acceptButtonLabel")}
                </Button>
            </Group>
        </Paper>
    );
};
