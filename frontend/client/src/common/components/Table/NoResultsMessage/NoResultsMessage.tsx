import { Box, Button, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import { useTranslate } from "../../../i18n";

import classes from "./NoResultsMessage.module.scss";

type NoResultsMessageProps = {
    description: string;
    onAdd?: () => unknown;
};

export const NoResultsMessage = ({ description, onAdd }: NoResultsMessageProps) => {
    const translate = useTranslate();

    return (
        <Stack className={classes.container}>
            <Box>
                <Text className={classes.title}>{translate("common.table.noResults.title")}</Text>
                <Text className={classes.description}>{description}</Text>
            </Box>
            {onAdd && (
                <Button color="success" className={classes.actionButton} onClick={onAdd} rightSection={<IconPlus />}>
                    {translate("common.table.noResults.addButton")}
                </Button>
            )}
        </Stack>
    );
};
