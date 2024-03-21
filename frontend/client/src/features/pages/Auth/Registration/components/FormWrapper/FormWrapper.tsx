import { PropsWithChildren, useMemo } from "react";
import { Stack, Text, Title } from "@mantine/core";

import { translate } from "../../../../../../common/i18n/i18n";

export const FormWrapper = ({ children, userName }: PropsWithChildren<{ userName: string }>) => {
    const parsedUserName = useMemo(() => {
        if (!userName) {
            return;
        }

        return `, ${userName}`;
    }, [userName]);

    const padWithSpaceIfNotEmpty = (text: string) => {
        if (text) {
            return ` ${text}`;
        }
        return "";
    };

    return (
        <Stack mih="60vh" justify="center">
            <Title ta="center" mb="xl">
                {translate("pages.registration.header.preEmphasis")}{" "}
                <Text span c="success" inherit>
                    {translate("pages.registration.header.emphasised")}
                </Text>
                {padWithSpaceIfNotEmpty(translate("pages.registration.header.postEmphasis"))}
                {parsedUserName}!
            </Title>
            {children}
        </Stack>
    );
};
