import { Accordion, Text } from "@mantine/core";

type FAQItemProps = {
    value: string;
    label: string;
    description: string;
};

export const FAQItem = ({ value, label, description }: FAQItemProps) => {
    return (
        <Accordion.Item value={value}>
            <Accordion.Control>
                <Text fz="sm" fw={500}>
                    {label}
                </Text>
            </Accordion.Control>
            <Accordion.Panel>
                <Text fz="sm" ta="justify">
                    {description}
                </Text>
            </Accordion.Panel>
        </Accordion.Item>
    );
};
