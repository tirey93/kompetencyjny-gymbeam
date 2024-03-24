import { Button, Container, Group, Image, List, rem, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

import picture from "./assets/hero-banner-picture.svg";
import { useTranslate } from "../../../../../common/i18n/hooks/useTranslate";

import classes from "./HeroBanner.module.scss";

export const HeroBanner = () => {
    const translate = useTranslate();

    return (
        <Container fluid p="xl" bg="dark">
            <Group w="100%" align="center" justify="center" p="xl" gap="xl">
                <Stack className={classes.content}>
                    <Title fw={800}>
                        {translate("pages.home.heroBanner.title.firstLine")} <br />
                        {translate("pages.home.heroBanner.title.secondLine")}{" "}
                        <Text c="primary" span inherit>
                            {translate("pages.home.heroBanner.title.highlighted")}
                        </Text>{" "}
                    </Title>
                    <Text c="dimmed" mt="md">
                        {translate("pages.home.heroBanner.description")}
                    </Text>

                    <List
                        mt={30}
                        spacing="sm"
                        size="sm"
                        icon={
                            <ThemeIcon size={20} radius="xl">
                                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                            </ThemeIcon>
                        }
                    >
                        <List.Item>
                            <b>{translate("pages.home.heroBanner.bulletPoints.variety.label")}</b> –{" "}
                            {translate("pages.home.heroBanner.bulletPoints.variety.description")}
                        </List.Item>
                        <List.Item>
                            <b>{translate("pages.home.heroBanner.bulletPoints.simplicity.label")}</b> –{" "}
                            {translate("pages.home.heroBanner.bulletPoints.simplicity.description")}
                        </List.Item>
                        <List.Item>
                            <b>{translate("pages.home.heroBanner.bulletPoints.costs.label")}</b> –{" "}
                            {translate("pages.home.heroBanner.bulletPoints.costs.description")}
                        </List.Item>
                    </List>

                    <Group mt={30}>
                        <Button size="md" variant="gradient">
                            {translate("pages.home.heroBanner.buttons.getStarted")}
                        </Button>
                        <Button variant="default" size="md">
                            {translate("pages.home.heroBanner.buttons.learnMore")}
                        </Button>
                    </Group>
                </Stack>
                <Image src={picture} mah={330} ml="xl" visibleFrom="lg" />
            </Group>
        </Container>
    );
};
