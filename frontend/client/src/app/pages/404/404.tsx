import { useNavigate } from "react-router-dom";
import { Box, Button, Group, Text, Title } from "@mantine/core";

import { Illustration404 } from "./assets/Illustration404";

import classes from "./404.module.scss";

import { AppRoute } from "@/app/router";
import { useTranslate } from "@/lib/i18n";

export const NotFoundPage = () => {
    const navigate = useNavigate();
    const translate = useTranslate();

    return (
        <Box className={classes.pageContainer}>
            <Illustration404 className={classes.Illustration404} />
            <Title className={classes.title}> {translate("pages.404.title")}</Title>
            <Text className={classes.description}>{translate("pages.404.description")}</Text>
            <Group className={classes.buttonsWrapper}>
                <Button variant="default" onClick={() => navigate(AppRoute.ROOT)}>
                    {translate("pages.404.goToHome")}
                </Button>
                <Button color="info" onClick={() => navigate(-1)}>
                    {translate("pages.404.goBack")}
                </Button>
            </Group>
        </Box>
    );
};
