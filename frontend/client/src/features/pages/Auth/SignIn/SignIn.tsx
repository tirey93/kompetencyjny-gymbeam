import { useCallback } from "react";
import { Anchor, Button, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";

import { useSignInForm } from "./hooks/useSignInForm";
import { useAppOverlayStore } from "../../../../common/components/AppOverlay/hooks/useAppOverlayStore";
import { translate } from "../../../../common/i18n/i18n";
import { Routes } from "../../../router/Routes";

export const SignInPage = () => {
    const { form } = useSignInForm();
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);

    const onSubmit = useCallback(async () => {
        if (form.validate()) {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setIsLoading(false);
        }
    }, [form, setIsLoading]);

    return (
        <Stack mih="60vh" justify="center" maw="600px" m="0 auto">
            <Title ta="center" mb="xl">
                {translate("pages.signIn.header.preEmphasis")}{" "}
                <Text span c="warning" inherit>
                    {translate("pages.signIn.header.emphasised")}
                </Text>{" "}
                {translate("pages.signIn.header.postEmphasis")}
            </Title>

            <Paper radius="md" withBorder p="xl" shadow="xl" component={Stack}>
                <TextInput
                    size="md"
                    required
                    label={translate("pages.signIn.field.login.label")}
                    placeholder={translate("pages.signIn.field.login.placeholder")}
                    {...form.getInputProps("login")}
                />
                <PasswordInput
                    size="md"
                    mt="md"
                    required
                    label={translate("pages.signIn.field.password.label")}
                    placeholder={translate("pages.signIn.field.password.placeholder")}
                    {...form.getInputProps("password")}
                />
            </Paper>

            <Stack mt="sm" maw="400px" miw="50%" m="0 auto">
                <Button
                    size="md"
                    variant="gradient"
                    gradient={{ from: "warning", to: "primary", deg: 45 }}
                    onClick={onSubmit}
                >
                    {translate("pages.signIn.navigation.submit")}
                </Button>
                <Anchor ta="center" c="info" href={Routes.REGISTRATION}>
                    {translate("pages.signIn.navigation.signUpLink")}
                </Anchor>
            </Stack>
        </Stack>
    );
};
