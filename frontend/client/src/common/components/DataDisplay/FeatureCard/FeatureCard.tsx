import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Card as MantineCard, rem, Text } from "@mantine/core";
import { Icon, IconProps } from "@tabler/icons-react";

type CardProps = {
    title: string;
    description: string;
    Icon: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>;
};

export const FeatureCard = ({ title, description, Icon }: CardProps) => {
    return (
        <MantineCard shadow="md" radius="md" padding="xl">
            <Icon style={{ width: rem(50), height: rem(50) }} stroke={2} />
            <Text c="primary" fz="xl" fw={500} mt="md">
                {title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {description}
            </Text>
        </MantineCard>
    );
};
