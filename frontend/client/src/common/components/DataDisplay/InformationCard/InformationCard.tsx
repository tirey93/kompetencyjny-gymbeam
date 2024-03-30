import { Paper, Stack, Text } from "@mantine/core";

import { InformationCardItem, InformationCardItemProps } from "./InformationCardItem";

type InformationCardProps = {
    title: string;
    items: InformationCardItemProps[];
    bg?: string;
};

export const InformationCard = ({ title, items, bg = "primary" }: InformationCardProps) => {
    return (
        <Paper p="lg" bg={bg}>
            <Text fz="lg" fw={700} mb="md">
                {title}
            </Text>

            <Stack gap="lg">
                {items.map((item) => (
                    <InformationCardItem key={item.title} {...item} />
                ))}
            </Stack>
        </Paper>
    );
};
