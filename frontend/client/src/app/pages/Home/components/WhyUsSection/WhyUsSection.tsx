import { useMemo } from "react";
import { Badge, Container, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconCookie, IconGauge, IconStarFilled, IconUser } from "@tabler/icons-react";

import classes from "./WhyUsSection.module.scss";

import { FeatureCard } from "@/components/DataDisplay";
import { useTranslate } from "@/lib/i18n";

export const WhyUsSection = () => {
    const translate = useTranslate();

    const cardsContent = useMemo(
        () => [
            {
                title: translate("pages.home.whyUs.cards.efficiency.label"),
                description: translate("pages.home.whyUs.cards.efficiency.description"),
                Icon: IconGauge,
            },
            {
                title: translate("pages.home.whyUs.cards.customers.label"),
                description: translate("pages.home.whyUs.cards.customers.description"),
                Icon: IconUser,
            },
            {
                title: translate("pages.home.whyUs.cards.privacy.label"),
                description: translate("pages.home.whyUs.cards.privacy.description"),
                Icon: IconCookie,
            },
        ],
        [translate]
    );

    const awards = useMemo(
        () => [
            translate("pages.home.whyUs.awards.sport2022"),
            translate("pages.home.whyUs.awards.sport2023"),
            translate("pages.home.whyUs.awards.startups2023"),
        ],
        [translate]
    );

    return (
        <Container size="lg">
            <Stack className={classes.container}>
                <Title order={2} className={classes.title}>
                    {translate("pages.home.whyUs.title")}
                </Title>

                <Text c="dimmed" className={classes.description}>
                    {translate("pages.home.whyUs.description")}
                </Text>

                <Group className={classes.awardsContainer}>
                    {awards.map((award) => (
                        <Badge key={award} variant="light" color="success" leftSection={<IconStarFilled size={10} />}>
                            {award}
                        </Badge>
                    ))}
                </Group>

                <SimpleGrid cols={{ base: 1, md: 3 }} className={classes.featureCardsContainer}>
                    {cardsContent.map((content) => (
                        <FeatureCard key={content.title} {...content} />
                    ))}
                </SimpleGrid>
            </Stack>
        </Container>
    );
};
