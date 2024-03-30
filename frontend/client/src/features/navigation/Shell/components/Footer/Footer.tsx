import { Container, Group } from "@mantine/core";

import { Logo } from "../../../../../common/components/Logo";

export const Footer = () => {
    return (
        <Container p="lg" fluid>
            <Group w="100%" justify="center">
                <Logo size="xl" withName />
            </Group>
        </Container>
    );
};
