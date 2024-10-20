import { Container, Group } from "@mantine/core";

import classes from "./Footer.module.scss";

import { Logo } from "@/components/Logo";

export const Footer = () => {
    return (
        <Container className={classes.footerContainer} fluid>
            <Group className={classes.footerContentWrapper}>
                <Logo size="xl" variant="gradient" withName />
            </Group>
        </Container>
    );
};
