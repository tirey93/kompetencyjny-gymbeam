import { Box, Group, rem, Text } from "@mantine/core";
import { IconSun } from "@tabler/icons-react";

export type InformationCardItemProps = {
    icon?: typeof IconSun;
    title: string;
    description: string;
};

export const InformationCardItem = ({ icon: Icon, title, description }: InformationCardItemProps) => {
    return (
        <Group>
            {Icon && (
                <Box mr="md">
                    <Icon style={{ width: rem(24), height: rem(24) }} />
                </Box>
            )}

            <Box>
                <Text fw={700} size="xs">
                    {title}
                </Text>
                <Text>{description}</Text>
            </Box>
        </Group>
    );
};
