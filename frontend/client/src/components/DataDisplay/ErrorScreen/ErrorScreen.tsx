import { Button, Card, Container, Text } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

import classes from "./ErrorScreen.module.scss";

import { useTranslate } from "@/lib/i18n";

type ErrorScreenProps = {
    description: string;
    title: string;
    onRetry: () => unknown;
};

export const ErrorScreen = ({ description, title, onRetry }: ErrorScreenProps) => {
    const translate = useTranslate();

    return (
        <Container size="xl" className={classes.container}>
            <Card className={classes.card}>
                <IconExclamationCircle className={classes.warningIcon} size={50} />
                <Text className={classes.title}>{title}</Text>
                <Text className={classes.description}>{description}</Text>
                <Button variant="default" className={classes.actionButton} onClick={onRetry}>
                    {translate("common.errorScreen.retry")}
                </Button>
            </Card>
        </Container>
    );
};
