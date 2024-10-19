import { List, Text } from "@mantine/core";

import classes from "./TermsAndConditions.module.scss";

type TermsAndConditionsSectionProps = {
    title: string;
    items: string[];
};

export const TermsAndConditionsSection = ({ title, items }: TermsAndConditionsSectionProps) => {
    return (
        <List.Item className={classes.section}>
            <Text className={classes.sectionTitle}>{title}</Text>
            <List type="ordered" className={classes.subList}>
                {items.map((item) => (
                    <List.Item key={item}>
                        <Text className={classes.listItem}>{item}</Text>
                    </List.Item>
                ))}
            </List>
        </List.Item>
    );
};
