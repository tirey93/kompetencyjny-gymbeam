import { Paper, Stack, Text } from "@mantine/core";

import { InformationCardItem, InformationCardItemProps } from "./InformationCardItem";

import classes from "./InformationCard.module.scss";

type InformationCardProps = {
    title: string;
    items: InformationCardItemProps[];
    bg?: string;
};

export const InformationCard = ({ title, items, bg = "primary" }: InformationCardProps) => {
    return (
        <Paper bg={bg} className={classes.informationCard}>
            <Text className={classes.title}>{title}</Text>

            <Stack className={classes.itemsContainer}>
                {items.map((item) => (
                    <InformationCardItem key={item.title} {...item} />
                ))}
            </Stack>
        </Paper>
    );
};
