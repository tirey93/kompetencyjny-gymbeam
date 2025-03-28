import { PropsWithChildren } from "react";
import { Paper, Stack, Text, Title } from "@mantine/core";

import { RegistrationFormFooter } from "../RegistrationFormFooter/RegistrationFormFooter";

import classes from "./RegistrationFormWrapper.module.scss";

import { ErrorMessage } from "@/components/DataDisplay";
import { useTranslate } from "@/lib/i18n";

export type RegistrationFormWrapperProps = PropsWithChildren<{
    onNextStep?: () => unknown;
    onPreviousStep?: () => unknown;
    userDisplayName: string;
    errorProps?: {
        signUpError?: string;
        clearSignUpError: () => unknown;
    };
}>;

export const RegistrationFormWrapper = ({
    children,
    onPreviousStep,
    onNextStep,
    errorProps,
}: RegistrationFormWrapperProps) => {
    const translate = useTranslate();

    const padWithSpaceIfNotEmpty = (text: string) => {
        if (text) {
            return ` ${text}`;
        }
        return "";
    };

    return (
        <Stack className={classes.container}>
            <Title className={classes.title}>
                {translate("pages.registration.header.preEmphasis")}{" "}
                <Text className={classes.titleHighlight} span inherit>
                    {translate("pages.registration.header.emphasised")}
                </Text>
                {padWithSpaceIfNotEmpty(translate("pages.registration.header.postEmphasis"))}!
            </Title>

            <Paper className={classes.formWrapper} withBorder component={Stack}>
                {children}
            </Paper>

            {errorProps?.signUpError && (
                <ErrorMessage onClose={errorProps.clearSignUpError}>{errorProps.signUpError}</ErrorMessage>
            )}
            <RegistrationFormFooter onPreviousStep={onPreviousStep} onNextStep={onNextStep} />
        </Stack>
    );
};
