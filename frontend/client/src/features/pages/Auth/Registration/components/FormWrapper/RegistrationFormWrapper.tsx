import { PropsWithChildren, useMemo } from "react";
import { Paper, Stack, Text, Title } from "@mantine/core";

import { ErrorMessage } from "../../../../../../common/components/DataDisplay";
import { useTranslate } from "../../../../../../common/i18n";
import { RegistrationFormFooter } from "../RegistrationFormFooter/RegistrationFormFooter";

const MAX_DISPLAYABLE_USER_NAME_LENGTH = 10;

export type RegistrationFormWrapperProps = PropsWithChildren<{
    onNextStep?: () => unknown;
    onPreviousStep?: () => unknown;
    userName: string;
    errorProps?: {
        signUpError?: string;
        clearSignUpError: () => unknown;
    };
}>;

export const RegistrationFormWrapper = ({
    children,
    userName,
    onPreviousStep,
    onNextStep,
    errorProps,
}: RegistrationFormWrapperProps) => {
    const translate = useTranslate();

    const parsedUserName = useMemo(() => {
        if (!userName) {
            return;
        }

        return `, ${userName.length > MAX_DISPLAYABLE_USER_NAME_LENGTH ? translate("pages.registration.header.defaultName") : userName}`;
    }, [userName]);

    const padWithSpaceIfNotEmpty = (text: string) => {
        if (text) {
            return ` ${text}`;
        }
        return "";
    };

    return (
        <Stack justify="center" mt="xl">
            <Title ta="center" mb="xl" textWrap="wrap">
                {translate("pages.registration.header.preEmphasis")}{" "}
                <Text span c="primary" inherit>
                    {translate("pages.registration.header.emphasised")}
                </Text>
                {padWithSpaceIfNotEmpty(translate("pages.registration.header.postEmphasis"))}
                {parsedUserName}!
            </Title>

            <Paper radius="md" withBorder p="xl" shadow="xl" component={Stack}>
                {children}
            </Paper>

            {errorProps && <ErrorMessage onClose={errorProps.clearSignUpError}>{errorProps.signUpError}</ErrorMessage>}
            <RegistrationFormFooter onPreviousStep={onPreviousStep} onNextStep={onNextStep} />
        </Stack>
    );
};
