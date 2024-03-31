import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Card as MantineCard, Text } from "@mantine/core";
import { Icon, IconProps } from "@tabler/icons-react";

import classes from "./FeatureCard.module.scss";

type CardProps = {
    title: string;
    description: string;
    Icon: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>;
};

export const FeatureCard = ({ title, description, Icon }: CardProps) => {
    return (
        <MantineCard className={classes.featureCard}>
            <Icon className={classes.icon} />
            <Text c="primary" className={classes.title}>
                {title}
            </Text>
            <Text className={classes.description}>{description}</Text>
        </MantineCard>
    );
};
