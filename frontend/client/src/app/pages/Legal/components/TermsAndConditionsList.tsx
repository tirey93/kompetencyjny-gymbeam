import { Grid, List, Title } from "@mantine/core";

import classes from "./TermsAndConditions.module.scss";

import { TermsAndConditionsSection } from "@/app/pages/Legal/components/TermsAndConditionsSection";
import { useTranslate } from "@/lib/i18n";

export const TermsAndConditionsList = () => {
    const t = useTranslate();

    const termsAndConditions = [
        {
            title: t("pages.termsAndConditions.generalTerms.title"),
            items: [
                t("pages.termsAndConditions.generalTerms.items.1"),
                t("pages.termsAndConditions.generalTerms.items.2"),
                t("pages.termsAndConditions.generalTerms.items.3"),
            ],
        },
        {
            title: t("pages.termsAndConditions.gymMembership.title"),
            items: [
                t("pages.termsAndConditions.gymMembership.items.1"),
                t("pages.termsAndConditions.gymMembership.items.2"),
                t("pages.termsAndConditions.gymMembership.items.3"),
            ],
        },
        {
            title: t("pages.termsAndConditions.classRegistrationAndAttendance.title"),
            items: [
                t("pages.termsAndConditions.classRegistrationAndAttendance.items.1"),
                t("pages.termsAndConditions.classRegistrationAndAttendance.items.2"),
                t("pages.termsAndConditions.classRegistrationAndAttendance.items.3"),
            ],
        },
        {
            title: t("pages.termsAndConditions.lateArrivals.title"),
            items: [
                t("pages.termsAndConditions.lateArrivals.items.1"),
                t("pages.termsAndConditions.lateArrivals.items.2"),
            ],
        },
        {
            title: t("pages.termsAndConditions.appUsageAndTechnicalSupport.title"),
            items: [
                t("pages.termsAndConditions.appUsageAndTechnicalSupport.items.1"),
                t("pages.termsAndConditions.appUsageAndTechnicalSupport.items.2"),
            ],
        },
        {
            title: t("pages.termsAndConditions.accountSuspensionAndTermination.title"),
            items: [
                t("pages.termsAndConditions.accountSuspensionAndTermination.items.1"),
                t("pages.termsAndConditions.accountSuspensionAndTermination.items.2"),
            ],
        },
        {
            title: t("pages.termsAndConditions.paymentAndRefundPolicy.title"),
            items: [
                t("pages.termsAndConditions.paymentAndRefundPolicy.items.1"),
                t("pages.termsAndConditions.paymentAndRefundPolicy.items.2"),
            ],
        },
        {
            title: t("pages.termsAndConditions.dataPrivacy.title"),
            items: [
                t("pages.termsAndConditions.dataPrivacy.items.1"),
                t("pages.termsAndConditions.dataPrivacy.items.2"),
            ],
        },
        {
            title: t("pages.termsAndConditions.liabilityDisclaimer.title"),
            items: [
                t("pages.termsAndConditions.liabilityDisclaimer.items.1"),
                t("pages.termsAndConditions.liabilityDisclaimer.items.2"),
            ],
        },
        {
            title: t("pages.termsAndConditions.contactInformation.title"),
            items: [t("pages.termsAndConditions.contactInformation.items.1")],
        },
    ];

    return (
        <Grid>
            <Title className={classes.title}>{t("pages.termsAndConditions.header")}</Title>
            <List className={classes.list} type="ordered">
                {termsAndConditions.map((section) => (
                    <TermsAndConditionsSection {...section} key={section.title} />
                ))}
            </List>
        </Grid>
    );
};
