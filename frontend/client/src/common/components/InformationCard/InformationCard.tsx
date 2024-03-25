import { Paper, Stack, Text } from "@mantine/core";

import { InformationCardItem, InformationCardItemProps } from "./InformationCardItem";

type InformationCardProps = {
    title: string;
    items: InformationCardItemProps[];
    bg?: string;
};

export const InformationCard = ({ title, items, bg }: InformationCardProps) => {
    return (
        <Paper bg={bg} p="lg">
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
