import { useMemo } from "react";
import { Container, SimpleGrid } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { IconAt, IconMapPin, IconPhone } from "@tabler/icons-react";

import { FAQSection, HeroBanner, WhyUsSection } from "./components";

import classes from "./Home.module.scss";

import { InformationCard } from "@/components/DataDisplay";
import { useTranslate } from "@/lib/i18n";

export const HomePage = () => {
    const translate = useTranslate();
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
        cancelable: true,
    });

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
        <Container fluid className={classes.container}>
            <HeroBanner onLearnMoreClick={scrollIntoView} />
            <WhyUsSection />
            <FAQSection targetRef={targetRef} />
            <Container>
                <SimpleGrid cols={{ sm: 1, md: 2 }}>
                    <InformationCard title={translate("pages.home.contact.title")} items={contactInfo} bg="primary" />
                    <InformationCard
                        title={translate("pages.home.workingHours.title")}
                        items={workingHours}
                        bg="dark"
                    />
                </SimpleGrid>
            </Container>
        </Container>
    );
};
