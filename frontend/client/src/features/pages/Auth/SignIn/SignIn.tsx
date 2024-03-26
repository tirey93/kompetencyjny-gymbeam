import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Anchor, Button, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";

import { useSignInForm } from "./hooks/useSignInForm";
import { useSignIn } from "../../../../common/auth/hooks/useSignIn";
import { useTranslate } from "../../../../common/i18n/hooks/useTranslate";
import { Routes } from "../../../router/Routes";
import { INPUT_LABEL_PROPS } from "../Auth.shared";

export const SignInPage = () => {
    const translate = useTranslate();
    const { form } = useSignInForm();
    const { signIn } = useSignIn();
    const navigate = useNavigate();

    const onSubmit = useCallback(async () => {
        if (!form.validate().hasErrors) {
            const { login, password } = form.values;
            await signIn({ login, password });
        }
    }, [form, signIn]);

    return (
        <Stack maw="600px" mih="800px" m="auto" justify="center">
            <Title ta="center" mb="xl">
                {translate("pages.signIn.header.preEmphasis")}{" "}
                <Text span c="accent" inherit>
                    {translate("pages.signIn.header.emphasised")}
                </Text>{" "}
                {translate("pages.signIn.header.postEmphasis")}
            </Title>

            <Paper radius="md" withBorder p="xl" shadow="xl" component={Stack}>
                <TextInput
                    size="md"
                    labelProps={INPUT_LABEL_PROPS}
                    label={translate("pages.signIn.field.login.label")}
                    placeholder={translate("pages.signIn.field.login.placeholder")}
                    {...form.getInputProps("login")}
                />
                <PasswordInput
                    size="md"
                    mt="md"
                    labelProps={INPUT_LABEL_PROPS}
                    label={translate("pages.signIn.field.password.label")}
                    placeholder={translate("pages.signIn.field.password.placeholder")}
                    {...form.getInputProps("password")}
                />
            </Paper>

            <Stack mt="sm" maw="400px" miw="50%" m="0 auto">
                <Button size="md" variant="gradient" onClick={onSubmit}>
                    {translate("pages.signIn.navigation.submit")}
                </Button>
                <Anchor ta="center" c="info" onClick={() => navigate(Routes.REGISTRATION)}>
                    {translate("pages.signIn.navigation.signUpLink")}
                </Anchor>
            </Stack>
        </Stack>
    );
};
