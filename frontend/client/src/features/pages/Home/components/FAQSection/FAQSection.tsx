import { useMemo } from "react";
import { Accordion, Container, Title } from "@mantine/core";

import { FAQItem } from "./components/FAQItem";
import { useTranslate } from "../../../../../common/i18n/hooks/useTranslate";

import classes from "./FAQSection.module.scss";

export const FAQSection = () => {
    const translate = useTranslate();

    const questions = useMemo(
        () => [
            {
                value: "abandoning",
                label: translate("pages.home.FAQ.items.abandoning.question"),
                description: translate("pages.home.FAQ.items.abandoning.answer"),
            },
            {
                value: "new-activities",
                label: translate("pages.home.FAQ.items.newActivities.question"),
                description: translate("pages.home.FAQ.items.newActivities.answer"),
            },
        ],
        [translate]
    );

    return (
        <Container size="sm">
            <Title ta="center" mb="xl" order={2}>
                {translate("pages.home.FAQ.header")}
            </Title>

            <Accordion chevronPosition="right" variant="contained" chevronSize={25} classNames={classes}>
                {questions.map((question) => (
                    <FAQItem key={question.value} {...question} />
                ))}
            </Accordion>
        </Container>
    );
};
