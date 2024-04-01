import { Button, Container, Group, Image, List, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

import picture from "./assets/hero-banner-picture.svg";
import { useTranslate } from "../../../../../common/i18n";

import classes from "./HeroBanner.module.scss";

type HeroBannerProps = {
    onLearnMoreClick: () => unknown;
};

export const HeroBanner = ({ onLearnMoreClick }: HeroBannerProps) => {
    const translate = useTranslate();

    return (
        <Container className={classes.container} fluid bg="dark">
            <Group className={classes.group}>
                <Stack className={classes.textContent}>
                    <Title className={classes.title}>
                        {translate("pages.home.heroBanner.title.firstLine")} <br />
                        {translate("pages.home.heroBanner.title.secondLine")}{" "}
                        <Text className={classes.titleHighlight} span inherit>
                            {translate("pages.home.heroBanner.title.highlighted")}
                        </Text>{" "}
                    </Title>
                    <Text className={classes.description}>{translate("pages.home.heroBanner.description")}</Text>

                    <List
                        className={classes.featuresList}
                        icon={
                            <ThemeIcon className={classes.checkIcon}>
                                <IconCheck />
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

                    <Group className={classes.buttonsWrapper}>
                        <Button size="md" variant="gradient">
                            {translate("pages.home.heroBanner.buttons.getStarted")}
                        </Button>
                        <Button variant="default" size="md" onClick={onLearnMoreClick}>
                            {translate("pages.home.heroBanner.buttons.learnMore")}
                        </Button>
                    </Group>
                </Stack>
                <Image className={classes.image} src={picture} visibleFrom="lg" />
            </Group>
        </Container>
    );
};
