import { Accordion, Text } from "@mantine/core";

import classes from "./FAQItem.module.scss";

type FAQItemProps = {
    value: string;
    label: string;
    description: string;
};

export const FAQItem = ({ value, label, description }: FAQItemProps) => {
    return (
        <Accordion.Item className={classes.container} value={value}>
            <Accordion.Control>
                <Text className={classes.question}>{label}</Text>
            </Accordion.Control>
            <Accordion.Panel>
                <Text className={classes.answer}>{description}</Text>
            </Accordion.Panel>
        </Accordion.Item>
    );
};
