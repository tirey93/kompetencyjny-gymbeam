import { Container, Space } from "@mantine/core";

import { FAQSection } from "./components/FAQSection/FAQSection";
import { HeroBanner } from "./components/HeroBanner/HeroBanner";
import { WhyUsSection } from "./components/WhyUsSection/WhyUsSection";

export const HomePage = () => {
    return (
        <Container fluid p={0}>
            <HeroBanner />
            <Space h="xl" />
            <WhyUsSection />
            <Space h="xl" />
            <FAQSection />
        </Container>
    );
};
