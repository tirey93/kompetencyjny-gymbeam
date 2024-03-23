import { useNavigate } from "react-router-dom";
import { Button, Group, Stack, Text, Title } from "@mantine/core";

import { Illustration404 } from "./assets/Illustration404";
import { translate } from "../../../common/i18n/i18n";
import { Routes } from "../../router/Routes";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Stack justify="center" align="center" mih="100dvh" w="100dvw">
            <Illustration404 width="30dvmax" />
            <Title mt="xl"> {translate("pages.404.title")}</Title>
            <Text c="dimmed" size="lg" ta="center" maw="600px">
                {translate("pages.404.description")}
            </Text>
            <Group>
                <Button mt="xl" variant="default" size="md" onClick={() => navigate(Routes.ROOT)}>
                    {translate("pages.404.goToHome")}
                </Button>
                <Button mt="xl" variant="gradient" size="md" onClick={() => navigate(-1)}>
                    {translate("pages.404.goBack")}
                </Button>
            </Group>
        </Stack>
    );
};
