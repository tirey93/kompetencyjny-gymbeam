import { List, ListItem, Text } from "@mantine/core";

import classes from "./TermsAndConditions.module.scss";

type TermsAndConditionsSectionProps = {
    title: string;
    items: string[];
};

export const TermsAndConditionsSection = ({ title, items }: TermsAndConditionsSectionProps) => {
    return (
        <ListItem>
            <Text className={classes.sectionTitle}>{title}</Text>
            <List type="ordered" className={classes.subList}>
                {items.map((item) => (
                    <ListItem key={item}>
                        <Text className={classes.listItem}>{item}</Text>
                    </ListItem>
                ))}
            </List>
        </ListItem>
    );
};
