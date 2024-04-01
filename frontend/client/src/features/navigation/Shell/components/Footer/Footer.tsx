import { Container, Group } from "@mantine/core";

import { Logo } from "../../../../../common/components/Logo";

import classes from "./Footer.module.scss";

export const Footer = () => {
    return (
        <Container className={classes.footerContainer} fluid>
            <Group className={classes.footerContentWrapper}>
                <Logo size="xl" withName />
            </Group>
        </Container>
    );
};
