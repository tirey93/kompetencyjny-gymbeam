import { useMemo } from "react";
import { Container, SimpleGrid, Space } from "@mantine/core";
import { IconAt, IconMapPin, IconPhone } from "@tabler/icons-react";

import { FAQSection } from "./components/FAQSection/FAQSection";
import { HeroBanner } from "./components/HeroBanner/HeroBanner";
import { WhyUsSection } from "./components/WhyUsSection/WhyUsSection";
import { InformationCard } from "../../../common/components/InformationCard/InformationCard";
import { useTranslate } from "../../../common/i18n/hooks/useTranslate";

export const HomePage = () => {
    const translate = useTranslate();

    const contactInfo = useMemo(
        () => [
            { title: translate("pages.home.contact.email"), description: "hello@gymbeam.com", icon: IconAt },
            { title: translate("pages.home.contact.phone"), description: "+48 500 600 500", icon: IconPhone },
            {
                title: translate("pages.home.contact.address"),
                description: "93-574 Łódź, Radwańska 300",
                icon: IconMapPin,
            },
        ],
        [translate]
    );

    const workingHours = useMemo(
        () => [
            { title: translate("pages.home.workingHours.monThu"), description: "10:00 - 22:00" },
            { title: translate("pages.home.workingHours.friSat"), description: "8:00 - 23:00" },
            { title: translate("pages.home.workingHours.sun"), description: "12:00 - 20:00" },
        ],
        [translate]
    );

    return (
        <Container fluid p={0}>
            <HeroBanner />
            <Space h="xl" />
            <WhyUsSection />
            <Space h="xl" />
            <Container py="xl">
                <SimpleGrid cols={{ sm: 1, md: 2 }}>
                    <InformationCard title={translate("pages.home.contact.title")} items={contactInfo} bg="primary" />
                    <InformationCard
                        title={translate("pages.home.workingHours.title")}
                        items={workingHours}
                        bg="dark"
                    />
                </SimpleGrid>
            </Container>
            <Space h="xl" />
            <FAQSection />
        </Container>
    );
};
