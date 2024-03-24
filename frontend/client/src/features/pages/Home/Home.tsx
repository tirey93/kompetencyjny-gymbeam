import { Container, Space } from "@mantine/core";

import { WhyUsSection } from "./components/FeatureCards/WhyUsSection";
import { HeroBanner } from "./components/HeroBanner/HeroBanner";

export const HomePage = () => {
    return (
        <Container fluid p={0}>
            <HeroBanner />
            <Space h="xl" />
            <WhyUsSection />
        </Container>
    );
};
