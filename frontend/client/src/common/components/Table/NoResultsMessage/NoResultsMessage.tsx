import { Box, Button, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import { useTranslate } from "../../../i18n";

import classes from "./NoResultsMessage.module.scss";

type NoResultsMessageProps = {
    description: string;
    onActionButtonClick?: () => unknown;
    actionButtonLabel?: string;
};

export const NoResultsMessage = ({ description, onActionButtonClick, actionButtonLabel }: NoResultsMessageProps) => {
    const translate = useTranslate();

    return (
        <Stack className={classes.container}>
            <Box>
                <Text className={classes.title}>{translate("common.table.noResults.title")}</Text>
                <Text className={classes.description}>{description}</Text>
            </Box>
            {onActionButtonClick && (
                <Button
                    color="success"
                    className={classes.actionButton}
                    onClick={onActionButtonClick}
                    rightSection={<IconPlus />}
                >
                    {actionButtonLabel ?? translate("common.table.noResults.addButton")}
                </Button>
            )}
        </Stack>
    );
};
