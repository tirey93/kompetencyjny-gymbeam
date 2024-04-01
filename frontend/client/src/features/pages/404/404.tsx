import { useNavigate } from "react-router-dom";
import { Box, Button, Group, Text, Title } from "@mantine/core";

import { Illustration404 } from "./assets/Illustration404";
import { useTranslate } from "../../../common/i18n";
import { Routes } from "../../router";

import classes from "./404.module.scss";

export const NotFoundPage = () => {
    const navigate = useNavigate();
    const translate = useTranslate();

    return (
        <Box className={classes.pageContainer}>
            <Illustration404 className={classes.Illustration404} />
            <Title className={classes.title}> {translate("pages.404.title")}</Title>
            <Text className={classes.description}>{translate("pages.404.description")}</Text>
            <Group className={classes.buttonsWrapper}>
                <Button variant="default" onClick={() => navigate(Routes.ROOT)}>
                    {translate("pages.404.goToHome")}
                </Button>
                <Button variant="gradient" onClick={() => navigate(-1)}>
                    {translate("pages.404.goBack")}
                </Button>
            </Group>
        </Box>
    );
};
