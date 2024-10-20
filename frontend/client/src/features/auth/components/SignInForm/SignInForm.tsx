import React, { useCallback } from "react";
import { Button, Divider, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";

import { SignInFormInputs, useSignInForm } from "./hooks/useSignInForm";
import { GoogleOAuthButton } from "../GoogleOAuthButton/GoogleOAuthButton";

import classes from "./SignInForm.module.scss";

import { ErrorMessage } from "@/components/DataDisplay";
import { useTranslate } from "@/lib/i18n";

type SignInFormProps = {
    onSubmit: (inputs: SignInFormInputs) => void;
    onRegister: () => void;
    error?: string | null;
    onCloseError: () => void;
};

export const SignInForm = ({ onSubmit, onRegister, error, onCloseError }: SignInFormProps) => {
    const { form } = useSignInForm();
    const translate = useTranslate();

    const handleSubmit = useCallback(async () => {
        if (!form.validate().hasErrors) {
            onSubmit(form.values);
        }
    }, [form, onSubmit]);

    const submitOnEnter = useCallback(
        async (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                await handleSubmit();
            }
        },
        [handleSubmit]
    );

    return (
        <Stack className={classes.container}>
            <Title className={classes.title}>
                {translate("pages.signIn.header.preEmphasis")}{" "}
                <Text span className={classes.titleEmphasis} inherit>
                    {translate("pages.signIn.header.emphasised")}
                </Text>{" "}
                {translate("pages.signIn.header.postEmphasis")}
            </Title>
            <Paper className={classes.form} withBorder component={Stack}>
                <TextInput
                    autoFocus
                    classNames={{
                        label: classes.inputLabel,
                    }}
                    size="md"
                    label={translate("pages.signIn.field.login.label")}
                    placeholder={translate("pages.signIn.field.login.placeholder")}
                    onKeyDown={submitOnEnter}
                    {...form.getInputProps("login")}
                />
                <PasswordInput
                    classNames={{
                        label: classes.inputLabel,
                    }}
                    size="md"
                    label={translate("pages.signIn.field.password.label")}
                    placeholder={translate("pages.signIn.field.password.placeholder")}
                    onKeyDown={submitOnEnter}
                    {...form.getInputProps("password")}
                />
            </Paper>

            {error && <ErrorMessage onClose={onCloseError}>{error}</ErrorMessage>}

            <Stack className={classes.buttonsContainer}>
                <Button size="md" color="success" onClick={handleSubmit}>
                    {translate("pages.signIn.navigation.submit")}
                </Button>
                <Button variant="subtle" color="info" onClick={onRegister}>
                    {translate("pages.signIn.navigation.signUpLink")}
                </Button>

                <Divider label={translate("pages.signIn.oAuth.divider")} />
                <GoogleOAuthButton />
            </Stack>
        </Stack>
    );
};
