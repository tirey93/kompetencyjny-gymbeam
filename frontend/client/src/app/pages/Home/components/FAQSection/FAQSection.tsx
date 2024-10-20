import { RefObject, useMemo } from "react";
import { Accordion, Container, Title } from "@mantine/core";

import classes from "./FAQSection.module.scss";

import { FAQItem } from "@/app/pages/Home/components/FAQSection/components/FAQItem";
import { useTranslate } from "@/lib/i18n";

type FAQSectionProps = {
    targetRef: RefObject<HTMLDivElement>;
};

export const FAQSection = ({ targetRef }: FAQSectionProps) => {
    const translate = useTranslate();

    const questions = useMemo(
        () => [
            {
                value: "cancelationPolicy",
                label: translate("pages.home.FAQ.items.cancelationPolicy.question"),
                description: translate("pages.home.FAQ.items.cancelationPolicy.answer"),
            },
            {
                value: "lateAttendancePenalty",
                label: translate("pages.home.FAQ.items.lateAttendancePenalty.question"),
                description: translate("pages.home.FAQ.items.lateAttendancePenalty.answer"),
            },
            {
                value: "attendanceByProxy",
                label: translate("pages.home.FAQ.items.attendanceByProxy.question"),
                description: translate("pages.home.FAQ.items.attendanceByProxy.answer"),
            },
            {
                value: "futureActivities",
                label: translate("pages.home.FAQ.items.futureActivities.question"),
                description: translate("pages.home.FAQ.items.futureActivities.answer"),
            },
            {
                value: "changingRegistration",
                label: translate("pages.home.FAQ.items.changingRegistration.question"),
                description: translate("pages.home.FAQ.items.changingRegistration.answer"),
            },
            {
                value: "lateArrivalPolicy",
                label: translate("pages.home.FAQ.items.lateArrivalPolicy.question"),
                description: translate("pages.home.FAQ.items.lateArrivalPolicy.answer"),
            },
            {
                value: "membershipSuspension",
                label: translate("pages.home.FAQ.items.membershipSuspension.question"),
                description: translate("pages.home.FAQ.items.membershipSuspension.answer"),
            },
            {
                value: "classAccessRestrictions",
                label: translate("pages.home.FAQ.items.classAccessRestrictions.question"),
                description: translate("pages.home.FAQ.items.classAccessRestrictions.answer"),
            },
            {
                value: "technicalSupport",
                label: translate("pages.home.FAQ.items.technicalSupport.question"),
                description: translate("pages.home.FAQ.items.technicalSupport.answer"),
            },
        ],
        [translate]
    );

    return (
        <Container className={classes.container} ref={targetRef}>
            <Title order={2} className={classes.title}>
                {translate("pages.home.FAQ.header")}
            </Title>

            <Accordion chevronPosition="right" variant="contained" chevronSize={25} classNames={{ item: classes.item }}>
                {questions.map((question) => (
                    <FAQItem key={question.value} {...question} />
                ))}
            </Accordion>
        </Container>
    );
};
