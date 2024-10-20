import { Box, Group, Text, ThemeIcon } from "@mantine/core";
import { IconSun } from "@tabler/icons-react";

import classes from "./InformationCardItem.module.scss";

export type InformationCardItemProps = {
    icon?: typeof IconSun;
    title: string;
    description: string;
};

export const InformationCardItem = ({ icon: Icon, title, description }: InformationCardItemProps) => {
    return (
        <Group className={classes.informationCardItem}>
            {Icon && (
                <ThemeIcon className={classes.icon}>
                    <Icon />
                </ThemeIcon>
            )}

            <Box>
                <Text className={classes.title}>{title}</Text>
                <Text>{description}</Text>
            </Box>
        </Group>
    );
};
