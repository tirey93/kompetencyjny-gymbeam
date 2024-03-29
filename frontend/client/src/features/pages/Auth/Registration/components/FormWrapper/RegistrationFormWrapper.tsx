import { PropsWithChildren, useMemo } from "react";
import { Paper, Stack, Text, Title } from "@mantine/core";

import { useTranslate } from "../../../../../../common/i18n/hooks/useTranslate";
import { RegistrationFormFooter } from "../RegistrationFormFooter/RegistrationFormFooter";

const MAX_DISPLAYABLE_USER_NAME_LENGTH = 10;

export type RegistrationFormWrapperProps = PropsWithChildren<{
    onNextStep?: () => unknown;
    onPreviousStep?: () => unknown;
    userName: string;
}>;

export const RegistrationFormWrapper = ({
    children,
    userName,
    onPreviousStep,
    onNextStep,
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
            <RegistrationFormFooter onPreviousStep={onPreviousStep} onNextStep={onNextStep} />
        </Stack>
    );
};
